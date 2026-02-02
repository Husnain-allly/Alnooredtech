const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { onRequest } = require("firebase-functions/v2/https");

admin.initializeApp();
const db = getFirestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());


const LEOPARD_BASE_URL = process.env.LEOPARD_BASE_URL;
const LEOPARD_API_KEY = process.env.LEOPARD_API_KEY;
const LEOPARD_API_PASSWORD = process.env.LEOPARD_API_PASSWORD;



// =========================
// Leopard Cities Cache
// =========================
let leopardCitiesCache = {
  data: null,
  fetchedAt: 0,
};

const LEOPARD_CITIES_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

async function fetchLeopardCities({ force = false } = {}) {
  const now = Date.now();

  if (
    !force &&
    leopardCitiesCache.data &&
    now - leopardCitiesCache.fetchedAt < LEOPARD_CITIES_TTL_MS
  ) {
    return leopardCitiesCache.data;
  }

  const url = `${LEOPARD_BASE_URL}/getAllCities/format/json/`;

  const resp = await axios.post(
    url,
    {
      api_key: LEOPARD_API_KEY,
      api_password: LEOPARD_API_PASSWORD,
    },
    { timeout: 60000 }
  );

  const data = resp.data;

if (data?.status !== 1 || data?.error !== 0 || !Array.isArray(data?.city_list)) {
  throw new Error(
    `Leopard getAllCities failed: status=${data?.status} error=${data?.error} msg=${data?.message || ""}`
  );
}


  leopardCitiesCache = {
    data: resp.data.city_list,
    fetchedAt: now,
  };

  return resp.data.city_list;
}

function normalizeCityName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function resolveDestinationCityId(cities, customerCityName) {
  const target = normalizeCityName(customerCityName);

  // 1️⃣ Exact match only
  const exactMatches = cities.filter(
    c => normalizeCityName(c.name) === target
  );

  if (exactMatches.length === 1) {
    const city = exactMatches[0];
    if (!city.allow_as_destination) {
      throw new Error(`City disabled for destination: "${city.name}"`);
    }
    return city.id;
  }

  if (exactMatches.length > 1) {
    throw new Error(`Multiple exact city matches found for "${customerCityName}"`);
  }

  // 2️⃣ Starts-with match (e.g. "lahore" → "lahore cantt")
  const startsWithMatches = cities.filter(
    c => normalizeCityName(c.name).startsWith(target)
  );

  if (startsWithMatches.length === 1) {
    const city = startsWithMatches[0];
    if (!city.allow_as_destination) {
      throw new Error(`City disabled for destination: "${city.name}"`);
    }
    return city.id;
  }

  if (startsWithMatches.length > 1) {
    throw new Error(
      `Ambiguous city name "${customerCityName}". Matches: ${startsWithMatches
        .map(c => c.name)
        .join(", ")}`
    );
  }

  // 3️⃣ Contains match (LAST resort)
  const containsMatches = cities.filter(
    c => normalizeCityName(c.name).includes(target)
  );

  if (containsMatches.length === 1) {
    const city = containsMatches[0];
    if (!city.allow_as_destination) {
      throw new Error(`City disabled for destination: "${city.name}"`);
    }
    return city.id;
  }

  if (containsMatches.length > 1) {
    throw new Error(
      `Ambiguous city name "${customerCityName}". Matches: ${containsMatches
        .map(c => c.name)
        .join(", ")}`
    );
  }

  // ❌ Nothing matched
  throw new Error(`Destination city not found: "${customerCityName}"`);
}


// -------------------------
// Health check
// -------------------------
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    hasLeopardConfig: Boolean(LEOPARD_BASE_URL && LEOPARD_API_KEY && LEOPARD_API_PASSWORD),
  });
});

app.get("/leopard/cities", async (req, res) => {
  try {
    const cities = await fetchLeopardCities({ force: req.query.force === "1" });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// -------------------------
// Leopard booking function (WE will finalize endpoint/payload once you paste docs)
// -------------------------
async function createLeopardBooking({ customer, codAmountPKR, orderId, items }) {
  const url = `${LEOPARD_BASE_URL}/bookPacket/format/json/`;

  const cities = await fetchLeopardCities();
  const destinationCityId = resolveDestinationCityId(cities, customer.city);

  const pieces = items.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0);

  const specialInstructions = String(
    customer.specialInstructions || "Handle with care"
  ).trim();

  if (!specialInstructions) {
    throw new Error("Special Instructions are required");
  }

  const payload = {
    api_key: LEOPARD_API_KEY,
    api_password: LEOPARD_API_PASSWORD,

    origin_city: "self",
    destination_city: destinationCityId,

    booked_packet_weight: 500,
    booked_packet_no_piece: pieces,
    booked_packet_collect_amount: codAmountPKR,
    booked_packet_order_id: orderId,

    shipment_name_eng: "self",
    shipment_phone: "self",
    shipment_address: "self",

    consignment_name_eng: customer.name,
    consignment_phone: customer.phone,
    consignment_address: customer.address,

    special_instructions: specialInstructions,
  };
  console.log("Leopard booking payload:", payload);

  const resp = await axios.post(url, payload, { timeout: 60000 });

  if (resp.data?.status !== 1) {
    throw new Error(`Leopard booking failed: ${resp.data?.error || "Unknown error"}`);
  }

  const trackingNumber = resp.data.track_number;
  const slipLink = resp.data.slip_link;

  if (!trackingNumber) {
    throw new Error("Leopard did not return tracking number");
  }

  return {
    trackingNumber,
    slipLink,
    raw: resp.data,
  };
}


// -------------------------
// POST /orders (basic version)
// -------------------------
app.post("/orders", async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body || {};

    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
      return res.status(400).json({ error: "Missing required customer fields" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items are required" });
    }
    if (!["cod", "card"].includes(paymentMethod)) {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    // ✅ For now, accept items as sent (we’ll harden with server-side prices next)
    // items: [{ productId, title, quantity, unitPricePKR }]
    const totalPKR = items.reduce((sum, it) => {
      const qty = Number(it.quantity) || 1;
      const price = Number(it.unitPricePKR) || 0;
      return sum + qty * price;
    }, 0);

    const orderRef = db.collection("orders").doc();
    const orderId = orderRef.id;

    const orderDoc = {
      orderId,
      customer,
      items,
      totalPKR,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "unpaid" : "pending_payment",
      orderStatus: paymentMethod === "cod" ? "pending_booking" : "pending_payment",
      courier: null,
      trackingNumber: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await orderRef.set(orderDoc);

    // COD => create Leopard booking immediately
    if (paymentMethod === "cod") {
      const booking = await createLeopardBooking({
        customer,
        codAmountPKR: totalPKR,
        orderId,
        items,
      });

      await orderRef.update({
        courier: "leopard",
        trackingNumber: booking.trackingNumber,
        orderStatus: "booked",
        updatedAt: FieldValue.serverTimestamp(),
      });

      return res.json({
        orderId,
        status: "booked",
        trackingNumber: booking.trackingNumber,
      });
    }

    // Card => return pending for now (we’ll add Stripe later)
    return res.json({
      orderId,
      status: "pending_payment",
      message: "Order created. Proceed to payment.",
    });
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
});

exports.api = onRequest(app);

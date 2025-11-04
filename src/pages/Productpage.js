import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "../pages/Booksdata";
import { Star } from "lucide-react";
import { useCart } from "../pages/CartContext";
import { useCurrency } from "../pages/CurrencyContext"; // ✅ use context

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(id));
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { currency } = useCurrency(); // ✅ currency from context

  if (!book) return <p className="p-10 text-center">Book not found!</p>;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <button
        onClick={() => navigate(-1)}
        className="p-2 m-4 bg-brand rounded"
      >
        Back
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
        {/* Left: Images */}
        <div>
          <img
            src={book.images[activeImage]}
            alt={book.title}
            className="w-full rounded shadow"
          />
          <div className="flex gap-2 mt-4">
            {book.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  activeImage === idx ? "border-yellow-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>

          {/* Price */}
          <p className="text-xl text-gray-600 mb-4">
            {currency ? `${currency.symbol} ${book.price * currency.value}` : "Loading price..."}
          </p>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-brand fill-brand" />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({book.reviews} customer reviews)
            </span>
          </div>

          <p className="mb-6 text-gray-700">Selling fast! Grab yours now.</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button className="px-3 py-1 text-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="px-4">{quantity}</span>
              <button className="px-3 py-1 text-lg" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button
              className="bg-brand text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 px-6 py-2 font-bold shadow-md"
              onClick={() =>
                addToCart({
                  id: book.id,
                  title: book.title,
                  price: book.price * currency.value,
                  symbol: currency.symbol,
                  image: book.images[0],
                  quantity,
                })
              }
            >
              Add To Cart
            </button>
          </div>

          {/* SKU/Category/Tags */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>SKU: {book.sku}</p>
            <p>Category: {book.category}</p>
            <p>Tags: {book.tags.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="max-w-6xl mx-auto px-6 mt-12 pb-12">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Description</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
      </section>
    </div>
  );
}

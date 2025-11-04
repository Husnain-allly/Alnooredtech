// src/data/booksData.js
import img1Front from "../pics/Book1-Front.png"
import img1Side from "../pics/Book1-Page.jpg";
import  img1Back from "../pics/Book1-Back.jpg";
import img2Front from "../pics/Book1-Page.jpg"; // more books
// ...other images

export const books = [
 {
  id: 1,
  title: "Guiding Lights (Vol-1)",
  price: 2500,  // ✅ number only
  images: [img1Front, img1Side, img1Back],
  description: `...`,
  additional: {
    language: "English",
    pages: 250,
    binding: "Hardcover",
  },
  sku: "56842",
  category: "Islamic Books",
  tags: ["Spiritual Books", "Quran", "Hadeeth"],
},

 {
    id: 2,
    title: "Guiding Lights (Vol-2)",
    price: 1200,  // ✅ number
    images: [img2Front /*, ...*/],
    description: "Detailed description of book 2...",
    additional: {
      language: "English",
      pages: 200,
      binding: "Paperback",
    },
    sku: "56843",
    category: "Islamic Books",
    tags: ["Islam", "Learning"],
  },
  // Add more books...
];


// src/data/booksData.js
import img1Front from "../pics/Book1-Front.png";
import img1Side from "../pics/Book1-Page.jpg";
import img1Back from "../pics/Book1-Back.jpg";
import img2Front from "../pics/Book1-Page.jpg"; // more books

export const books = [
  {
    id: 1,
    title: "Guiding Lights (Vol-1)",
    price: 2500,
    images: [img1Front, img1Side, img1Back],
    description: `This book, "Guiding Lights from the Gate of Knowledge" - Sayings of Amir ul Momineen from the book Peak of Eloquence (Volume 1), will become the enlightenment for my dear children to help them open the gate for the city of knowledge. You will find beautiful glimpses into the wisdom of Imam Ali Ibn Abi Talib [A], carefully chosen from a collection of his powerful words called "Nahj ul Balagha" or "Peak of Eloquence." 

Also, by practicing each quote every day, you will be able to reach one step higher in the sight of Allah Almighty, to whom we shall return. So, it is a simple guide to be a humble and knowledgeable person with easy understanding of his quotes.`,
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
    price: 1200,
    images: [img2Front],
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
];

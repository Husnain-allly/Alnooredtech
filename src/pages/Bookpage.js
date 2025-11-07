import { useNavigate } from "react-router-dom";
import { books } from "../pages/Booksdata";
import { useCurrency } from "../pages/CurrencyContext";  // ✅ currency context

export default function BooksPage() {
  const navigate = useNavigate();
  const { currency } = useCurrency();  // ✅ get current currency

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-10 bg-white">
      {books.map((book) => (
        <div
          key={book.id}
          onClick={() => navigate(`/books/${book.id}`)}
          className="cursor-pointer bg-brand rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          <img
            src={book.images[0]}
            alt={book.title}
            className="w-full h-72 object-cover rounded-t-xl"
          />
          <div className="p-4 text-gray-800">
            <h2 className="font-semibold text-lg mb-1">{book.title}</h2>
            {/* ✅ Correct price display */}
            <p className="text-gray-700 font-medium">
              {currency.symbol} {currency.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

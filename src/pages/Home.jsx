import { useState } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "../components/ItemCard.jsx";
import { products } from "../data/products.js";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon, ShoppingCart } from "lucide-react";

const Home = () => {
  const [productList] = useState(products);
  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <form
        onSubmit={handleSearch}
        className="flex border-[1px] justify-between border-[#c2c2c2] rounded-[4px] md:hidden"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="px-3 py-2 flex-1 text-gray-800 outline-none rounded-l-[4px]"
        />
        <button type="submit" className="text-black px-4 py-2">
          <SearchIcon />
        </button>
      </form>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

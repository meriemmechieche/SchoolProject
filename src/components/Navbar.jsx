import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { SearchIcon , ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  return (
    <nav className="bg-white text-black px-6 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-[500] tracking-tight">
          DZClothing
        </Link>
        <div className="flex items-center gap-12">
          <form onSubmit={handleSearch} className="flex border-[1px] border-[#777777] rounded-[4px] max-md:hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-2 text-gray-800 outline-none rounded-l-[4px]"
            />
            <button type="submit" className="text-black px-4 py-2">
              <SearchIcon />
            </button>
          </form>
          <Link to="/cart" className="relative flex items-center justify-center gap-2 transition">
            <ShoppingCart></ShoppingCart> ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
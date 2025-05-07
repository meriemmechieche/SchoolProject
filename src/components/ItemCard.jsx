import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ItemCard = ({ product }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
      {product.views < 10 && (
        <span className="absolute top-7 left-5 bg-sky-500 text-white px-3 py-1 rounded-[5px] text-sm font-semibold">
          New Arrival
        </span>
      )}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[30rem] object-cover"
        />
      </Link>
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-[500] text-gray-800">{product.name}</h3>
        <p className="text-[#8f8f8f] font-[500]">{product.price} DZD</p>
      </div>
      <div className="p-4">
        <button
        className="w-full bg-black text-white py-2 rounded-[4px] transition"
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
      >
        Add to Cart
      </button>
      </div>
      
    </div>
  );
};

export default ItemCard;

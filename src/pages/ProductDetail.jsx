import { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, setProducts } = useContext(ProductContext);
  const { dispatch } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (product && !hasIncremented.current) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === parseInt(id) ? { ...p, views: p.views + 1 / 2 } : p
        )
      );
      hasIncremented.current = true;
    }
    return () => {
      hasIncremented.current = false;
    };
  }, [id]);

  if (!product)
    return <div className="container mx-auto p-6">Product not found</div>;

  return (
    <>
    <div className="p-6 h-[80vh] flex items-center justify-center w-full">
      <div className="flex flex-col lg:flex-row gap-8 w-[70%] bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 ">
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/2 h-[70vh] object-cover rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-between items-start pt-[3rem] pb-[7rem]">
          <h1 className="text-3xl text-black font-[500]">{product.name}</h1>
          <p className="text-2xl text-black font-[500] mt-2">
            {product.price} DZD
          </p>
          <p className="text-gray-500 mt-2">Views: {product.views}</p>
          <p className="text-gray-500">Sold: {product.sold}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="mt-3 border-t pt-2">
                  <p className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2">No reviews yet</p>
            )}
          </div>
          <button
            className="mt-4 md:w-fit items-center justify-center bg-black text-white py-3 px-8 rounded-[4px] hover:bg-blue-700 flex gap-4 transition"
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          >
            <ShoppingCart></ShoppingCart> Add to Cart
          </button>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default ProductDetail;

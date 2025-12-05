import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <div
      className="pt-20  xs:px-4 md:px-6 
        min-h-screen 
        w-full 
        max-w-6xl
        xl:max-w-[88%]
        mx-auto 
        px-3 
        sm:px-6 
        overflow-x-hidden
        absolute top-3 xl:left-20 2xl:max-w-[93%]
        "
    >
      <h1 className="font-extrabold text-center text-xl xs:text-2xl md:text-3xl mb-6">
        Your Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-sm xs:text-base md:text-xl text-gray-600">
            Your cart is empty 🧺
          </p>
        </div>
      ) : (
        <div className="shadow-md bg-amber-50 p-3 xs:p-4 md:p-6 rounded-xl space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between flex-row md:items-center md:justify-between xs:items-center xs:justify-between gap-4 border-b pb-4"
            >
              {/* Item Info */}
              <div className="flex items-center gap-4 ">
                {item.product_image && (
                  <img
                    src={`${BASEURL}${item.product_image}`}
                    alt={item.product_name}
                    className=" w-25 h-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="text-center flex-col-1 justify-center align-middle">
                <h2 className="font-bold text-sm xs:text-base md:text-lg ">
                  {item.product_name}
                </h2>
                <p className="text-gray-700">${item.product_price}</p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap  justify-center gap-3">
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center
                    bg-black text-white rounded-md 
                    hover:bg-gray-800 transition"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                <span className="w-6 text-center font-semibold text-sm md:text-base">
                  {item.quantity}
                </span>
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center 
                    bg-black text-white rounded-md 
                    hover:bg-gray-800 transition"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="rounded-md bg-red-600 text-white px-2 py-1
                    text-xs xs:text-sm md:text-base
                    hover:bg-red-700 transition cursor-pointer ml-6"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex flex-row  justify-between items-start xs:items-center gap-2 pt-4   w-full">
            <h2 className="font-bold text-base xs:text-lg md:text-xl">
              Total:
            </h2>
            <p className="font-bold text-base xs:text-lg md:text-xl">
              ${total}
            </p>
            <Link
              to="/checkout"
              className=" text-blue-700  bg-gray-300 rounded-lg p-2  hover:ring-blue-500 hover:ring-2"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

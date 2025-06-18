import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || {};
    const totalAmount = localStorage.getItem('cartTotal') || "৳0.00";
    const numericTotal = parseFloat(totalAmount.replace(/[^\d.-]/g, "")) || 0;
    setCartItems(items);
    setTotal(numericTotal);
  }, []);

  const goToHome = () => {
    navigate("/");
  };

  const cleanText = (text) => text?.replace(/[^\x00-\x7F]/g, "").trim() || "";

  return (
    <div className="container mt-5">
      <h3>🧾 Your Cart</h3>
      <div className="mt-4">
        {Array.isArray(cartItems.orderItemList) && cartItems.orderItemList.length > 0 ? (
          cartItems.orderItemList.map((item, i) => (
            <div key={i} className="d-flex justify-content-between border-bottom py-3">
              <span>{cleanText(item.title)}</span>
              <span>{item.priceFormatted || `৳${item.price?.toFixed(2)}`}</span>
            </div>
          ))
        ) : (
          <p className="text-muted">No items in the cart.</p>
        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <button className="btn btn-outline-primary" onClick={goToHome}>
            ← Continue Shopping
          </button>
          <h5 className="mb-0">Total: ৳{total.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
}

export default Cart;

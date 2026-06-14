import { useState } from "react";

import { createOrder } from "../api/orders";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

function CartPage({ onRequireLogin }) {
  const { items, removeItem, clear, total } = useCart();
  const { isAuthenticated, username, accessToken } = useAuth();
  const [status, setStatus] = useState("idle");

  const heading = isAuthenticated
    ? `Hello ${username}, here is your cart`
    : "Your cart";

  async function handlePlaceOrder() {
    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }
    setStatus("placing");
    try {
      await createOrder(items, accessToken);
      clear();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section>
        <h2>Order placed</h2>
        <p>Thank you for your order.</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section>
        <h2>{heading}</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>{heading}</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.product.id} className="cart-card">
            <img
              className="cart-image"
              src="/placeholder.jpg"
              alt={item.product.name}
            />
            <div className="cart-card-info">
              <h3>{item.product.name}</h3>
              <p className="product-meta">
                {item.product.origin} · {item.product.roast_level}
              </p>
              <p className="cart-qty">
                {item.quantityKg} kg × {item.product.price_per_kg} PLN/kg ={" "}
                <strong className="cart-line-total">
                  {(
                    Number(item.product.price_per_kg) * item.quantityKg
                  ).toFixed(2)}{" "}
                  PLN
                </strong>
              </p>
            </div>
            <div className="cart-card-side">
              <button
                type="button"
                className="link-button"
                onClick={() => removeItem(item.product.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="cart-total">Total: {total.toFixed(2)} PLN</p>

      {!isAuthenticated && (
        <p className="login-error">You must be logged in to place an order.</p>
      )}
      {status === "error" && (
        <p className="login-error">Failed to place order.</p>
      )}

      <button
        type="button"
        className="place-order"
        onClick={handlePlaceOrder}
        disabled={status === "placing"}
      >
        {status === "placing" ? "Placing order..." : "Place order"}
      </button>
    </section>
  );
}

export default CartPage;

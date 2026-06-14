import { useEffect, useState } from "react";

import { getOrders } from "../api/orders";
import { useAuth } from "../auth/AuthContext";

function orderTotal(order) {
  return order.items.reduce(
    (sum, item) =>
      sum + Number(item.unit_price_per_kg) * Number(item.quantity_kg),
    0,
  );
}

function OrdersPage() {
  const { accessToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getOrders(accessToken)
      .then((data) => {
        setOrders(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [accessToken]);

  if (status === "loading") {
    return <p>Loading orders...</p>;
  }

  if (status === "error") {
    return <p>Failed to load orders.</p>;
  }

  if (orders.length === 0) {
    return (
      <section>
        <h2>Your orders</h2>
        <p>You have no orders yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Your orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-card">
            <div className="order-head">
              <span className="order-id">
                Order #{order.uuid.slice(0, 8).toUpperCase()}
              </span>
              <span className="order-status">{order.status}</span>
              <span className="order-date">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
            <ul className="order-items">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product_name} — {item.quantity_kg} kg ×{" "}
                  {item.unit_price_per_kg} PLN/kg ={" "}
                  {(
                    Number(item.unit_price_per_kg) * Number(item.quantity_kg)
                  ).toFixed(2)}{" "}
                  PLN
                </li>
              ))}
            </ul>
            <p className="order-total">
              Total: {orderTotal(order).toFixed(2)} PLN
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OrdersPage;

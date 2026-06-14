import { useState } from "react";

import "./App.css";
import { useAuth } from "./auth/AuthContext";
import { useCart } from "./cart/CartContext";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const { isAuthenticated, username, logout } = useAuth();
  const { count } = useCart();
  const [view, setView] = useState("products");

  let content;
  if (view === "login" && !isAuthenticated) {
    content = <LoginPage onSuccess={() => setView("products")} />;
  } else if (view === "cart") {
    content = <CartPage onRequireLogin={() => setView("login")} />;
  } else if (view === "orders" && isAuthenticated) {
    content = <OrdersPage />;
  } else {
    content = <ProductsPage />;
  }

  return (
    <>
      <header className="app-header">
        <button className="brand" onClick={() => setView("products")}>
          coffeeBNS
        </button>
        <nav className="app-nav">
          <button className="link-button" onClick={() => setView("cart")}>
            Cart ({count})
          </button>
          {isAuthenticated ? (
            <span className="auth-status">
              <button className="link-button" onClick={() => setView("orders")}>
                My orders
              </button>{" "}
              · {username} ·{" "}
              <button className="link-button" onClick={logout}>
                Log out
              </button>
            </span>
          ) : (
            <button className="link-button" onClick={() => setView("login")}>
              Log in
            </button>
          )}
        </nav>
      </header>

      <main>{content}</main>
    </>
  );
}

export default App;

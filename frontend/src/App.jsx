import { useState } from "react";

import "./App.css";
import { useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const { isAuthenticated, username, logout } = useAuth();
  const [view, setView] = useState("products");

  return (
    <>
      <header className="app-header">
        <button className="brand" onClick={() => setView("products")}>
          coffeeBNS
        </button>
        <nav>
          {isAuthenticated ? (
            <span className="auth-status">
              {username} ·{" "}
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

      <main>
        {view === "login" && !isAuthenticated ? (
          <LoginPage onSuccess={() => setView("products")} />
        ) : (
          <ProductsPage />
        )}
      </main>
    </>
  );
}

export default App;

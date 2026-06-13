import { useEffect, useState } from "react";

import { getProducts } from "../api/products";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  if (status === "error") {
    return <p>Failed to load products.</p>;
  }

  return (
    <section>
      <h2>Our beans:</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <img
              className="product-image"
              src="/placeholder.jpg"
              alt={product.name}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-meta">
                {product.origin} · {product.roast_level}
              </p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price_per_kg} PLN / kg</p>
              <p
                className={
                  product.is_available ? "stock in-stock" : "stock out-of-stock"
                }
              >
                <span className="stock-dot" />
                {product.is_available ? "In stock" : "Out of stock"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductsPage;

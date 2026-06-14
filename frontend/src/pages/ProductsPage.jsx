import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
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
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default ProductsPage;

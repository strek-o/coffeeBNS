import { useState } from "react";

import { useCart } from "../cart/CartContext";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [quantityKg, setQuantityKg] = useState(1);

  return (
    <li className="product-card">
      <img className="product-image" src="/placeholder.jpg" alt={product.name} />
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

        {product.is_available && (
          <div className="add-to-cart">
            <input
              type="number"
              min="0.25"
              step="0.25"
              value={quantityKg}
              onChange={(event) => setQuantityKg(Number(event.target.value))}
            />
            <span>kg</span>
            <button
              type="button"
              onClick={() => addItem(product, quantityKg)}
              disabled={quantityKg <= 0}
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default ProductCard;

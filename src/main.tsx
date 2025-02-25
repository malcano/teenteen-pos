// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ✅ CartProvider 가져오기
import "./index.css"; // ✅ CSS import

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider> {/* ✅ 여기에서 감싸줌 */}
      <App />
    </CartProvider>
  </React.StrictMode>
);
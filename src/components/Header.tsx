// src/components/Header.tsx
import React from "react";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { total } = useCart();
  return (
    <div className="bg-gray-800 text-white text-2xl font-bold p-4 text-center">
      총 금액: {total.toLocaleString()}원
    </div>
  );
};

export default Header;
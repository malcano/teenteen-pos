// src/components/Cart.tsx
import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  return (
    <div className="p-4 bg-gray-100">
      {cart.length === 0 && <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>}
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-2 border-b">
          <span>{item.name} ({item.quantity}개) - {item.price.toLocaleString()}원</span>
          <div className="space-x-2">
            <button className="bg-blue-500 text-white px-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
            <button className="bg-red-500 text-white px-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
            <button className="bg-gray-500 text-white px-2" onClick={() => removeItem(item.id)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
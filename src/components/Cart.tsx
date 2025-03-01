// src/components/Cart.tsx
import React from "react";
import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, updateQuantity, removeItem } = useCart();

//   return (
//     <div className="p-4 bg-gray-100">
//       {cart.length === 0 && <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>}
//       {cart.map((item) => (
//         <div key={item.id} className="flex justify-between items-center p-2 border-b">
//           <span>{item.name} ({item.quantity}개) - {item.price.toLocaleString()}원</span>
//           <div className="space-x-2">
//             <button className="bg-blue-500 text-white px-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
//             <button className="bg-red-500 text-white px-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
//             <button className="bg-gray-500 text-white px-2" onClick={() => removeItem(item.id)}>삭제</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  return (
    <div className="p-4 min-h-[200px] w-full flex flex-col flex-1"> {/* ✅ 폭 & 높이 유지 */}
      <h2 className="text-lg font-bold text-center">🛒 장바구니</h2>

      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p> 
        </div>
      ) : (
        <ul className="mt-2 space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span className="flex-1">{item.name} ({item.price.toLocaleString()}원)</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-500 text-white rounded">-</button>
                <span className="text-lg">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-500 text-white rounded">+</button>
                <button onClick={() => removeItem(item.id)} className="px-3 py-1 bg-red-500 text-white rounded">삭제</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
// const Cart = () => {
//   const { cart, updateQuantity, removeItem } = useCart();

//   return (
//     <div className="p-4 min-h-[200px] flex flex-col"> {/* ✅ 최소 높이 유지 */}
//       <h2 className="text-lg font-bold text-center">🛒 장바구니</h2>
//       <ul className="mt-2 space-y-2">
//         {cart.map((item) => (
//           <li key={item.id} className="flex justify-between items-center border-b py-2">
//             <span className="flex-1">{item.name} ({item.price.toLocaleString()}원)</span>
//             <div className="flex items-center space-x-2">
//               <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-red-500 text-white rounded">-</button>
//               <span className="text-lg">{item.quantity}</span>
//               <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-blue-500 text-white rounded">+</button>
//               <button onClick={() => removeItem(item.id)} className="px-3 py-1 bg-gray-500 text-white rounded">삭제</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default Cart;


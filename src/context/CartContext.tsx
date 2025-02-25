// // src/context/CartContext.tsx
// import React, { createContext, useContext, useState, useEffect } from "react";

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   total: number;
//   addItem: (item: CartItem) => void;
//   updateQuantity: (id: number, delta: number) => void;
//   removeItem: (id: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [total, setTotal] = useState(0); // ✅ total 상태를 별도로 관리

//   // ✅ cart 변경될 때 total 자동 업데이트
//   useEffect(() => {
//     setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
//   }, [cart]);

//   const addItem = (item: CartItem) => {
//     setCart((prev) => {
//       const exists = prev.find((p) => p.id === item.id);
//       if (exists) {
//         return prev.map((p) =>
//           p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id: number, delta: number) => {
//     setCart((prev) =>
//       prev
//         .map((item) =>
//           item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeItem = (id: number) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     console.log("🛒 장바구니 초기화됨!");
//     setCart([]); // ✅ 상태를 빈 배열로 설정
//     setTotal(0); // ✅ total 값도 초기화
//   };

//   return (
//     <CartContext.Provider value={{ cart, total, addItem, updateQuantity, removeItem, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };
// src/context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  total: number; // ✅ total 추가
  addItem: (item: CartItem) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0); // ✅ total 상태 추가

  // ✅ cart 변경 시 total 자동 업데이트
  useEffect(() => {
    setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [cart]);

  const addItem = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    console.log("🛒 장바구니 초기화됨!");
    setCart([]); // ✅ 장바구니 비우기
    setTotal(0); // ✅ total 값도 초기화
  };

  return (
    <CartContext.Provider value={{ cart, total, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
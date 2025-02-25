// // src/App.tsx
// import { useState } from "react";
// import { CartProvider, useCart } from "./context/CartContext";
// import Header from "./components/Header";
// import Cart from "./components/Cart";
// import ProductGrid from "./components/ProductGrid";
// import CheckoutModal from "./components/CheckoutModal";

// const App = () => {
//   // ✅ useState와 useCart를 함수 내부에서 선언해야 함!
//   const [isCheckoutOpen, setCheckoutOpen] = useState(false);
//   const { clearCart } = useCart(); 

//   return (
//     <CartProvider> {/* ✅ 여기에서 감싸줌 */}
//       <Header />
//       <Cart />
//       <ProductGrid 
//         onReset={() => {
//           console.log("초기화 실행!"); // ✅ 디버깅 로그
//           clearCart(); 
//         }} 
//         onCheckout={() => setCheckoutOpen(true)} 
//       />
      
//       {/* 체크아웃 모달 */}
//       <CheckoutModal
//         isOpen={isCheckoutOpen}
//         onConfirm={() => {
//           console.log("결제 완료!");
//           clearCart();
//           setCheckoutOpen(false);
//         }}
//         onClose={() => setCheckoutOpen(false)}
//       />
//     </CartProvider>
//   );
// };

// export default App;

// src/App.tsx
import { useState } from "react";
import { useCart } from "./context/CartContext"; // ✅ useCart만 가져오기
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";
import CheckoutModal from "./components/CheckoutModal";

const App = () => {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const { clearCart } = useCart(); // ✅ 이제 안전하게 사용 가능!

  return (
    <>
      <Header />
      <Cart />
      <ProductGrid 
        onReset={() => {
          console.log("초기화 실행!"); // ✅ 디버깅 로그
          clearCart(); 
        }} 
        onCheckout={() => setCheckoutOpen(true)} 
      />
      
      {/* 체크아웃 모달 */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onConfirm={() => {
          console.log("결제 완료!");
          clearCart();
          setCheckoutOpen(false);
        }}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
};

export default App;
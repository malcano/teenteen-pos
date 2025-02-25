// // src/App.tsx
// import { useState } from "react";
// import { useCart } from "./context/CartContext"; // ✅ useCart만 가져오기
// import Header from "./components/Header";
// import Cart from "./components/Cart";
// import ProductGrid from "./components/ProductGrid";
// import CheckoutModal from "./components/CheckoutModal";

// const App = () => {
//   const [isCheckoutOpen, setCheckoutOpen] = useState(false);
//   const { clearCart } = useCart(); // ✅ 이제 안전하게 사용 가능!

//   return (
//     <>
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
//     </>
//   );
// };

// export default App;

// src/App.tsx
import { useState } from "react";
import { useCart } from "./context/CartContext";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";
import CheckoutModal from "./components/CheckoutModal";
import ResetModal from "./components/ResetModal"; // ✅ 추가

const App = () => {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isResetOpen, setResetOpen] = useState(false); // ✅ 초기화 모달 상태 추가
  const { clearCart, total } = useCart();

  return (
    <>
      <Header />
      <Cart />
      <ProductGrid 
        onReset={() => setResetOpen(true)} // ✅ 초기화 버튼 클릭 시 모달 열기
        onCheckout={() => setCheckoutOpen(true)} 
      />

      {/* 초기화 확인 모달 */}
      <ResetModal
        isOpen={isResetOpen}
        onConfirm={() => {
          console.log("장바구니 초기화됨!");
          clearCart(); // ✅ 장바구니 초기화
          setResetOpen(false); // ✅ 모달 닫기
        }}
        onClose={() => setResetOpen(false)} // ✅ 취소 시 모달 닫기
      />

      {/* 체크아웃 모달 */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        total={total} // ✅ total 전달 (오류 해결)
        onConfirm={(paymentMethod) => {
          console.log(`결제 완료! 선택된 결제 방법: ${paymentMethod}`);
          clearCart();
          setCheckoutOpen(false);
        }}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
};

export default App;
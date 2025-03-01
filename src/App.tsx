// src/App.tsx
import { useState } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";
import ResetModal from "./components/ResetModal";
import CheckoutModal from "./components/CheckoutModal";
import { useCart } from "./context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
}

const initialProducts: Product[] = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `상품 ${i + 1}`,
    price: (i + 1) * 1000,
  })),
  { id: 21, name: "초기화", price: 0 }, // ✅ 수동 추가
  { id: 22, name: "체크아웃", price: 0 } // ✅ 수동 추가
];

const App = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isResetOpen, setResetOpen] = useState(false);
  const { clearCart } = useCart();

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* 메인 컨텐츠: 장바구니 (왼쪽) + 상품 목록 (오른쪽) */}
      <div className="flex flex-1 pt-35"> {/* ✅ 제목 높이만큼 위쪽 여백 추가 */}
        
        {/* ✅ 왼쪽: 장바구니 */}
        <div className="w-2/5 min-w-[350px] bg-gray-100 p-4 overflow-y-auto"> {/* ✅ 폭 유지 */}
        <Cart />
        </div>

        {/* ✅ 오른쪽: 상품 버튼 */}
        <div className="w-3/5 bg-white p-4 flex flex-col items-end overflow-y-auto mt-6">
        <ProductGrid 
            products={products} 
            onReset={() => {
              console.log("🛒 초기화 버튼 클릭됨!"); // ✅ 디버깅 로그
              setResetOpen(true);
            }}
            onCheckout={() => {
              console.log("💳 체크아웃 버튼 클릭됨!"); // ✅ 디버깅 로그
              setCheckoutOpen(true);
            }}
          />
        </div>
      </div>

      {/* ✅ 초기화 모달 */}
      <ResetModal
        isOpen={isResetOpen}
        onConfirm={() => {
          clearCart(); // ✅ 장바구니 초기화
          setResetOpen(false);
        }}
        onClose={() => setResetOpen(false)}
      />

      {/* ✅ 체크아웃 모달 */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        total={0} // ✅ 여기에 total 값 추가 필요
        onConfirm={() => {
          clearCart();
          setCheckoutOpen(false);
        }}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
};

export default App;
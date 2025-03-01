import { useState, useEffect } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";
import ResetModal from "./components/ResetModal";
import CheckoutModal from "./components/CheckoutModal";
import EditProductsModal from "./components/EditProductsModal";
import { useCart } from "./context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
}

const defaultProducts: Product[] = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `상품 ${i + 1}`,
    price: (i + 1) * 1000,
  })),
  { id: 21, name: "초기화", price: 0 }, 
  { id: 22, name: "체크아웃", price: 0 }, 
  { id: 23, name: "상품 편집", price: 0 } 
];

const App = () => {
  // ✅ 상품 목록을 `localStorage`에서 불러오도록 수정
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });

  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isResetOpen, setResetOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const { clearCart } = useCart();

  // ✅ 상품 수정 후 `localStorage`에 저장
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* 메인 컨텐츠: 장바구니 (왼쪽) + 상품 목록 (오른쪽) */}
      <div className="flex flex-1 pt-24"> {/* ✅ 제목 높이만큼 위쪽 여백 추가 */}
        
        {/* ✅ 왼쪽: 장바구니 */}
        <div className="w-2/5 min-w-[350px] bg-gray-100 p-4 overflow-y-auto">
          <Cart />
        </div>

        {/* ✅ 오른쪽: 상품 버튼 */}
        <div className="w-3/5 bg-white p-4 flex flex-col items-end overflow-y-auto mt-6">
          <ProductGrid 
            products={products} 
            onReset={() => setResetOpen(true)}
            onCheckout={() => setCheckoutOpen(true)}
            onEdit={() => setEditOpen(true)} // ✅ 23번 버튼 클릭 시 모달 열기
          />
        </div>
      </div>

      {/* ✅ 초기화 모달 */}
      <ResetModal
        isOpen={isResetOpen}
        onConfirm={() => {
          clearCart();
          setResetOpen(false);
        }}
        onClose={() => setResetOpen(false)}
      />

      {/* ✅ 체크아웃 모달 */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        total={0} 
        onConfirm={() => {
          clearCart();
          setCheckoutOpen(false);
        }}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* ✅ 상품 편집 모달 */}
      <EditProductsModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        products={products}
        onSave={(updatedProducts) => setProducts(updatedProducts)} // ✅ 수정된 상품 저장
      />
    </div>
  );
};

export default App;
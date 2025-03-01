// src/components/ProductGrid.tsx
import { useCart } from "../context/CartContext";


interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
  onReset: () => void;
  onCheckout: () => void;
}

const products = [
  { id: 1, name: "커피", price: 2000 },
  { id: 2, name: "아메리카노", price: 2500 },
  { id: 3, name: "라떼", price: 3000 },
  { id: 4, name: "샌드위치", price: 5000 },
  { id: 5, name: "케이크", price: 6000 },
  { id: 6, name: "쿠키", price: 1500 },
  { id: 7, name: "초코바", price: 1200 },
  { id: 8, name: "녹차", price: 3000 },
  { id: 9, name: "홍차", price: 3000 },
  { id: 10, name: "주스", price: 3500 },
  { id: 11, name: "아이스크림", price: 4500 },
  { id: 12, name: "도넛", price: 2700 },
  { id: 13, name: "핫초코", price: 3200 },
  { id: 14, name: "콜라", price: 2000 },
  { id: 15, name: "사이다", price: 2000 },
  { id: 16, name: "에너지 드링크", price: 5000 },
  { id: 17, name: "생수", price: 1000 },
  { id: 18, name: "버거", price: 7000 },
  { id: 19, name: "핫도그", price: 4500 },
  { id: 20, name: "감자튀김", price: 4000 },
  { id: 21, name: "초기화", price: 0 }, // 🔴 빨강 버튼
  { id: 22, name: "체크아웃", price: 0 }, // 🔵 파랑 버튼
  { id: 23, name: "샐러드", price: 5500 },
  { id: 24, name: "치킨", price: 9000 },
  { id: 25, name: "피자", price: 11000 },
];

const ProductGrid = ({ onReset, onCheckout }: { onReset: () => void; onCheckout: () => void }) => {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {products.map((product) => {
        // 버튼 색상 설정
        let buttonClass = "p-4 text-white text-center bg-gray-900"; // ⚫ 기본 검정색

        if (product.id === 21) buttonClass = "p-4 text-white text-center bg-red-600"; // 🔴 빨강 (초기화)
        if (product.id === 22) buttonClass = "p-4 text-white text-center bg-blue-500"; // 🔵 파랑 (체크아웃)

        return (
          <button
            key={product.id}
            onClick={() => {
              if (product.id === 21) {
                onReset(); // ✅ 초기화 버튼
              } else if (product.id === 22) {
                console.log("체크아웃 버튼 클릭됨!"); // ✅ 콘솔 확인
                onCheckout(); // ✅ 체크아웃 버튼
              } else {
                addItem({ ...product, quantity: 1 });
              }
            }}
            className={buttonClass} // ✅ Tailwind 클래스 적용
          >
<span className="text-lg font-semibold">{product.name}</span> {/* ✅ 상품 이름 */}
            {product.id !== 21 && product.id !== 22 && ( // ✅ 초기화 & 체크아웃 버튼에는 가격 제외
              <span className="text-sm text-gray-300 mt-1"><br/>{product.price.toLocaleString()}원</span> // ✅ 가격 표시
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProductGrid;
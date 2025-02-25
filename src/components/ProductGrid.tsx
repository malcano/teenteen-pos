// src/components/ProductGrid.tsx
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "커피", price: 2000 },
  { id: 2, name: "아메리카노", price: 2500 },
  { id: 3, name: "라떼", price: 3000 },
  { id: 4, name: "샌드위치", price: 5000 },
  { id: 5, name: "케이크", price: 6000 },
  { id: 20, name: "초기화", price: 0 },
  { id: 21, name: "체크아웃", price: 0 },
];
const ProductGrid = ({ onReset, onCheckout }: { onReset: () => void; onCheckout: () => void }) => {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => {
            if (product.id === 20) {
              onReset(); // ✅ 초기화 버튼
            } else if (product.id === 21) {
              console.log("체크아웃 버튼 클릭됨!"); // ✅ 콘솔 확인
              onCheckout(); // ✅ 체크아웃 버튼
            } else {
              addItem({ ...product, quantity: 1 });
            }
          }}
          className={`p-4 text-white text-center ${product.id === 20 ? "bg-red-600" : product.id === 21 ? "bg-green-600" : "bg-blue-500"}`}
        >
          {product.name}
        </button>
      ))}
    </div>
  );
};

export default ProductGrid;
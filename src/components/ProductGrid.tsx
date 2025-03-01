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
  onEdit: () => void; // ✅ 상품 편집 버튼 클릭 시 실행할 함수 추가
}

const ProductGrid = ({ products, onReset, onCheckout, onEdit }: ProductGridProps) => {
  const { addItem } = useCart();

  return (
    <div className="flex justify-end p-4 w-full">
      <div className="grid grid-cols-5 gap-6 mt-6"> {/* ✅ 상품 간격 증가 */}
        {products.map((product) => {
          let buttonClass = "p-4 text-white text-center bg-gray-900"; // 기본 검정색
          let buttonLabel = product.name;

          if (product.id === 21) {
            buttonClass = "p-4 text-white text-center bg-red-600 w-28"; // ✅ 초기화 버튼 (빨강)
            buttonLabel = "초기화";
          } else if (product.id === 22) {
            buttonClass = "p-4 text-white text-center bg-blue-500 w-28"; // ✅ 체크아웃 버튼 (파랑)
            buttonLabel = "체크아웃";
          } else if (product.id === 23) {
            buttonClass = "p-4 text-white text-center bg-green-500 w-28"; // ✅ 상품 편집 버튼 (초록)
            buttonLabel = "상품 편집";
          }

          return (
            <button
              key={product.id}
              onClick={() => {
                if (product.id === 21) {
                  onReset();
                } else if (product.id === 22) {
                  onCheckout();
                } else if (product.id === 23) {
                  onEdit(); // ✅ 23번 버튼 클릭 시 상품 편집 모달 실행
                } else {
                  addItem({ ...product, quantity: 1 });
                }
              }}
              className={`${buttonClass} flex flex-col items-center justify-center h-24 w-28`} // ✅ 크기 조정
            >
              <span className="text-lg font-semibold">{buttonLabel}</span>
              {product.id < 21 && (
                <span className="text-sm text-gray-300 mt-2">
                  {product.price.toLocaleString()}원
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
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
const ProductGrid = ({ products, onReset, onCheckout }: ProductGridProps) => {
  const { addItem } = useCart();

  return (
    <div className="flex justify-end p-4 w-full">
      <div className="grid grid-cols-5 gap-6 mt-6"> {/* ✅ 상품 간격 증가 */}
        {products.map((product) => {
          let buttonClass = "p-4 text-white text-center bg-gray-900"; // 기본 검정색
          let buttonLabel = product.name;

          if (product.id === 21) {
            buttonClass = "p-4 text-white text-center bg-red-600 w-28"; // ✅ 초기화 버튼 (빨강, 크기 조정)
            buttonLabel = "초기화";
          }
          if (product.id === 22) {
            buttonClass = "p-4 text-white text-center bg-blue-500 w-28"; // ✅ 체크아웃 버튼 (파랑, 크기 조정)
            buttonLabel = "체크아웃";
          }

          return (
            <button
              key={product.id}
              onClick={() => {
                if (product.id === 21) {
                  onReset();
                } else if (product.id === 22) {
                  onCheckout();
                } else {
                  addItem({ ...product, quantity: 1 });
                }
              }}
              className={`${buttonClass} flex flex-col items-center justify-center h-24 w-28`} // ✅ 크기 조정
            >
              <span className="text-lg font-semibold">{buttonLabel}</span>
              {product.id !== 21 && product.id !== 22 && (
                <span className="text-sm text-gray-300 mt-2">{product.price.toLocaleString()}원</span> // ✅ 가격 아래 배치
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
// const ProductGrid = ({ products, onReset, onCheckout }: ProductGridProps) => {
//   const { addItem } = useCart();

//   return (
//     <div className="flex justify-end p-4 w-full"> {/* ✅ 상품 버튼을 우측 정렬 */}
//       <div className="grid grid-cols-5 gap-"> {/* ✅ 간격 늘리기 */}
//         {products.map((product) => {
//           let buttonClass = "p-4 text-white text-center bg-gray-900"; // 기본 검정색
//           let buttonLabel = product.name; // ✅ 기본적으로 상품 이름 사용

//           if (product.id === 21) {
//             buttonClass = "p-4 text-white text-center bg-red-600"; // ✅ 초기화 버튼 (빨강)
//             buttonLabel = "초기화"; // ✅ 이름 고정
//           }
//           if (product.id === 22) {
//             buttonClass = "p-4 text-white text-center bg-blue-500"; // ✅ 체크아웃 버튼 (파랑)
//             buttonLabel = "체크아웃"; // ✅ 이름 고정
//           }

//           return (
//             <button
//               key={product.id}
//               onClick={() => {
//                 if (product.id === 21) {
//                   onReset(); // ✅ 초기화 버튼 동작
//                 } else if (product.id === 22) {
//                   onCheckout(); // ✅ 체크아웃 버튼 동작
//                 } else {
//                   addItem({ ...product, quantity: 1 });
//                 }
//               }}
//               className={`${buttonClass} flex flex-col items-center justify-center h-28 w-32`} // ✅ 버튼 크기 증가
//             >
//               <span className="text-lg font-semibold">{buttonLabel}</span>
//               {product.id !== 21 && product.id !== 22 && (
//                 <span className="text-sm text-gray-300 mt-1">{product.price.toLocaleString()}원</span>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// const ProductGrid = ({ products, onReset, onCheckout }: ProductGridProps) => {
//   const { addItem } = useCart();

//   return (
//     <div className="flex justify-end p-4 w-full"> {/* ✅ 상품 버튼을 우측 정렬 */}
//       <div className="grid grid-cols-5 gap-2">
//         {products.map((product) => {
//           let buttonClass = "p-4 text-white text-center bg-gray-900"; // 기본 검정색
//           let buttonLabel = product.name; // ✅ 기본적으로 상품 이름 사용

//           if (product.id === 21) {
//             buttonClass = "p-4 text-white text-center bg-red-600"; // ✅ 초기화 버튼 (빨강)
//             buttonLabel = "초기화"; // ✅ 이름 고정
//           }
//           if (product.id === 22) {
//             buttonClass = "p-4 text-white text-center bg-blue-500"; // ✅ 체크아웃 버튼 (파랑)
//             buttonLabel = "체크아웃"; // ✅ 이름 고정
//           }

//           return (
//             <button
//               key={product.id}
//               onClick={() => {
//                 if (product.id === 21) {
//                   onReset(); // ✅ 초기화 버튼 동작
//                 } else if (product.id === 22) {
//                   onCheckout(); // ✅ 체크아웃 버튼 동작
//                 } else {
//                   addItem({ ...product, quantity: 1 });
//                 }
//               }}
//               className={`${buttonClass} flex flex-col items-center justify-center h-24 w-24`}
//             >
//               <span className="text-lg font-semibold">{buttonLabel}</span>
//               {product.id !== 21 && product.id !== 22 && (
//                 <span className="text-sm text-gray-300 mt-1">{product.price.toLocaleString()}원</span>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

export default ProductGrid;
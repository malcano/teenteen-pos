
// // src/components/CheckoutModal.tsx
// import { useState } from "react";
// import Modal from "./Modal";

// interface CheckoutModalProps {
//   isOpen: boolean;
//   total: number;
//   onConfirm: (paymentMethod: string, change?: number) => void; // ✅ 거스름돈 추가
//   onClose: () => void;
// }

// const CheckoutModal = ({ isOpen, total, onConfirm, onClose }: CheckoutModalProps) => {
//   const [paymentMethod, setPaymentMethod] = useState<string>("현금"); // ✅ 기본값: 현금
//   const [change, setChange] = useState<number | "">(""); // ✅ 거스름돈 입력 상태 (빈 값 가능)

//   if (!isOpen) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <h2 className="text-xl font-bold text-center">총 금액</h2>
//       <p className="text-3xl font-bold text-center mt-2">{total.toLocaleString()}원</p>

//       {/* ✅ 라디오 버튼 추가 */}
//       <div className="flex flex-col items-center mt-4 space-y-2">
//         <label className="flex items-center space-x-2">
//           <input
//             type="radio"
//             name="payment"
//             value="현금"
//             checked={paymentMethod === "현금"}
//             onChange={() => {
//               setPaymentMethod("현금");
//               setChange(""); // ✅ 거스름돈 초기화
//             }}
//             className="form-radio h-5 w-5 text-blue-600"
//           />
//           <span>현금</span>
//         </label>

//         <label className="flex items-center space-x-2">
//           <input
//             type="radio"
//             name="payment"
//             value="계좌이체"
//             checked={paymentMethod === "계좌이체"}
//             onChange={() => {
//               setPaymentMethod("계좌이체");
//               setChange(""); // ✅ 거스름돈 초기화
//             }}
//             className="form-radio h-5 w-5 text-blue-600"
//           />
//           <span>계좌이체</span>
//         </label>
//       </div>

//       {/* ✅ 현금 선택 시 거스름돈 입력창 표시 */}
//       {paymentMethod === "현금" && (
//         <div className="mt-4">
//           <label className="block text-center font-medium">거스름돈 입력</label>
//           <input
//             type="number"
//             value={change}
//             onChange={(e) => setChange(Number(e.target.value))}
//             className="w-full mt-2 p-2 border rounded text-center"
//             placeholder="거스름돈 입력 (원)"
//           />
//         </div>
//       )}

//       <div className="flex justify-between mt-4">
//         <button
//           onClick={() => onConfirm(paymentMethod, paymentMethod === "현금" ? change : undefined)}
//           className="bg-green-500 text-white p-2 rounded w-1/2"
//         >
//           확인
//         </button>
//         <button onClick={onClose} className="bg-gray-300 p-2 rounded w-1/2">
//           취소
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default CheckoutModal;

// src/components/CheckoutModal.tsx
import { useState } from "react";
import Modal from "./Modal";

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  onConfirm: (paymentMethod: string, change?: number) => void; // ✅ change는 선택적(optional)으로 설정
  onClose: () => void;
}

const CheckoutModal = ({ isOpen, total, onConfirm, onClose }: CheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("현금");
  const [change, setChange] = useState<number | "">(""); // ✅ 빈 값도 허용

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-center">총 금액</h2>
      <p className="text-3xl font-bold text-center mt-2">{total.toLocaleString()}원</p>

      {/* ✅ 라디오 버튼 추가 */}
      <div className="flex flex-col items-center mt-4 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="현금"
            checked={paymentMethod === "현금"}
            onChange={() => {
              setPaymentMethod("현금");
              setChange(""); // ✅ 거스름돈 초기화
            }}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span>현금</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="계좌이체"
            checked={paymentMethod === "계좌이체"}
            onChange={() => {
              setPaymentMethod("계좌이체");
              setChange(""); // ✅ 거스름돈 초기화
            }}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span>계좌이체</span>
        </label>
      </div>

      {/* ✅ 현금 선택 시 거스름돈 입력창 표시 */}
      {paymentMethod === "현금" && (
        <div className="mt-4">
          <label className="block text-center font-medium">거스름돈 입력</label>
          <input
            type="number"
            value={change}
            onChange={(e) => setChange(Number(e.target.value))}
            className="w-full mt-2 p-2 border rounded text-center"
            placeholder="거스름돈 입력 (원)"
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onConfirm(paymentMethod, paymentMethod === "현금" ? (change || 0) : undefined)} // ✅ 거스름돈 값이 없으면 0으로 처리
          className="bg-green-500 text-white p-2 rounded w-1/2"
        >
          확인
        </button>
        <button onClick={onClose} className="bg-gray-300 p-2 rounded w-1/2">
          취소
        </button>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
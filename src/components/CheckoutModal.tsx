// src/components/CheckoutModal.tsx
import { useState } from "react";
import Modal from "./Modal";

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  onConfirm: (paymentMethod: string) => void;
  onClose: () => void;
}

const CheckoutModal = ({ isOpen, total, onConfirm, onClose }: CheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("현금"); // ✅ 상태 추가

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
            onChange={() => setPaymentMethod("현금")} // ✅ 상태 변경
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
            onChange={() => setPaymentMethod("계좌이체")} // ✅ 상태 변경
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span>계좌이체</span>
        </label>
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={() => onConfirm(paymentMethod)} className="bg-green-500 text-white p-2 rounded w-1/2">
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
// src/components/CheckoutModal.tsx
import { useCart } from "../context/CartContext";
import Modal from "./Modal";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const CheckoutModal = ({ isOpen, onClose, onConfirm }: CheckoutModalProps) => {
    const { total } = useCart();
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-xl font-bold text-center">총 금액</h2>
        <p className="text-3xl font-bold text-center mt-2">{total.toLocaleString()}원</p>
        <div className="flex justify-between mt-4">
          <button onClick={onConfirm} className="bg-green-500 text-white p-2 rounded w-1/2">
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
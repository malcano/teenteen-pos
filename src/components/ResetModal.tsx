// src/components/ResetModal.tsx
import Modal from "./Modal";

interface ResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ResetModal = ({ isOpen, onConfirm, onClose }: ResetModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold">정말 초기화 하시겠습니까?</h2>
      <div className="flex justify-between mt-4">
        <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded w-1/2">
          확인
        </button>
        <button onClick={onClose} className="bg-gray-300 p-2 rounded w-1/2">
          취소
        </button>
      </div>
    </Modal>
  );
};

export default ResetModal;
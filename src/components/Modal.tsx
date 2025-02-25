// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white p-2 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
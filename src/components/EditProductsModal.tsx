import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface EditProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: (updatedProducts: Product[]) => void;
}

const EditProductsModal = ({ isOpen, onClose, products, onSave }: EditProductsModalProps) => {
  const [editedProducts, setEditedProducts] = useState<Product[]>(products);

  const handleChange = (id: number, field: "name" | "price", value: string | number) => {
    setEditedProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleSave = () => {
    onSave(editedProducts);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">상품 편집</h2>

        {/* ✅ 상품 목록 5×4 그리드 */}
        <div className="grid grid-cols-5 gap-4">
          {editedProducts.slice(0, 20).map((product) => (
            <div key={product.id} className="p-2 bg-gray-100 rounded-lg flex flex-col items-center">
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleChange(product.id, "name", e.target.value)}
                className="w-full text-center border p-1 mb-1 rounded"
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleChange(product.id, "price", Number(e.target.value))}
                className="w-full text-center border p-1 rounded"
              />
            </div>
          ))}
        </div>

        {/* ✅ 버튼 영역 */}
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">취소</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">저장</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductsModal;
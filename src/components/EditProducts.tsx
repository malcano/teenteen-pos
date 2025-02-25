// src/components/EditProducts.tsx
import React, { useState } from "react";
import Modal from "./Modal";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface EditProductsProps {
  isOpen: boolean;
  products: Product[];
  onSave: (updatedProducts: Product[]) => void;
  onClose: () => void;
}

const EditProducts = ({ isOpen, products, onSave, onClose }: EditProductsProps) => {
  const [editedProducts, setEditedProducts] = useState(products);

  const handleChange = (id: number, field: "name" | "price", value: string) => {
    setEditedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: field === "price" ? Number(value) : value } : p))
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold">상품 편집</h2>
      {editedProducts.map((product) => (
        <div key={product.id} className="flex justify-between mt-2">
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleChange(product.id, "name", e.target.value)}
            className="border p-1 w-1/2"
          />
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleChange(product.id, "price", e.target.value)}
            className="border p-1 w-1/2"
          />
        </div>
      ))}
      <button onClick={() => onSave(editedProducts)} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
        저장
      </button>
    </Modal>
  );
};

export default EditProducts;
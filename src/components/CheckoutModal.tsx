import { useState } from "react";
import { useCart } from "../context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  onConfirm: (paymentMethod: string, change: number) => void;
  onClose: () => void;
}

const CheckoutModal = ({ isOpen, total, onConfirm, onClose }: CheckoutModalProps) => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("현금");
  const [change, setChange] = useState(0);

  const handleCheckout = () => {
    const seq = Date.now(); // ✅ 현재 시간을 기반으로 주문 번호 생성
    const purchaseData = {
      seq,
      paymentMethod,
      change,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    };

    // ✅ JSON 데이터 생성 및 다운로드
    const jsonData = JSON.stringify(purchaseData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `order_${seq}.json`; // ✅ 파일명: order_시간값.json
    a.click();
    URL.revokeObjectURL(url);

    // ✅ 체크아웃 후 장바구니 초기화
    clearCart();
    onConfirm(paymentMethod, change);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">결제 확인</h2>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">결제 방법:</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="현금"
                checked={paymentMethod === "현금"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              현금
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="계좌이체"
                checked={paymentMethod === "계좌이체"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              계좌이체
            </label>
          </div>
        </div>

        {/* ✅ 현금 선택 시 거스름돈 입력 필드 표시 */}
        {paymentMethod === "현금" && (
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">거스름돈 입력:</label>
            <input
              type="number"
              value={change}
              onChange={(e) => setChange(Number(e.target.value))}
              className="w-full border p-2 rounded"
              placeholder="거스름돈 입력"
            />
          </div>
        )}

        <div className="text-lg font-bold mb-4">총 금액: {total.toLocaleString()}원</div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">취소</button>
          <button onClick={handleCheckout} className="px-4 py-2 bg-blue-600 text-white rounded">확인</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
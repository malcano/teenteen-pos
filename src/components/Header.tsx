// src/components/Header.tsx
import { useCart } from "../context/CartContext";

const Header = () => {
  const { total } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-10">
      <h2 className="text-xl font-bold text-center">틴틴메이커 POS</h2>
      <h1 className="text-center mt-2 text-lg">총 금액: <span className="font-bold">{total.toLocaleString()}원</span></h1>
    </header>
  );
};

export default Header;
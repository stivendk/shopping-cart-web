"use client";

import ItemList from "./items/page";
import FloatingCartButton from "./components/floating-cart-button";
import CartModal from "./components/cart-modal";
import { useState } from "react";

export default function Home() {

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const toggleCartModal = () => {
      setIsCartModalOpen(prev => !prev);
  };

  return (
    <div>
      <ItemList />
      <FloatingCartButton isUpdated={isUpdated} setIsUpdated={setIsUpdated} toggleCartModal={toggleCartModal}/>
      {isCartModalOpen && (
        <CartModal isUpdated={isUpdated} setIsUpdated={setIsUpdated} closeCartModal={toggleCartModal}/>)}
    </div>
  );
}

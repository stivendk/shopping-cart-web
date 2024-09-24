"use client";

import React, { useEffect } from 'react';
import { useCart } from '../hooks/use-cart';
import styles from '../styles/cart-modal.module.scss';
import { CurrencyFormatter } from '../shared/format-currency';
import { useRouter } from 'next/navigation';


interface CartModalProps {
  closeCartModal: () => void;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}


const CartModal: React.FC<CartModalProps> = ({ closeCartModal, isUpdated, setIsUpdated }) => {
  const { cart, updateCartAfterAdd, updateCartItemQuantity, removeCartItem, totalCartPrice, payCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    updateCartAfterAdd().then(() => {
      setIsUpdated(false);
    });
    
  }, [isUpdated]);

  const handlePay = async () => {
    await payCart();
    router.push(`/invoice/${cart.id}`);
  };

  return (
    <div className={styles.cartModal}>
      <button className={styles.closeButton} onClick={closeCartModal}>✖</button>
      <div className={styles.cartContent}>
        {cart.items.map((cartItem) => (
          <div key={cartItem.id} className={styles.cartItem}>
            <img src={cartItem.item.urlImage} alt={cartItem.item.name} />
            <div className={styles.itemDetails}>
              <p><strong>{cartItem.item.name}</strong></p>
              <div className={styles.quantityControl}>
                <button className={styles.quantityButton} onClick={() => updateCartItemQuantity(cartItem.id, cartItem.quantity - 1)}>-</button>
                <div className={styles.quantityValue}>{cartItem.quantity}</div>
                <button className={styles.quantityButton} onClick={() => updateCartItemQuantity(cartItem.id, cartItem.quantity + 1)}>+</button>
              </div>
              <p>Precio: ${CurrencyFormatter.formatCurrency(cartItem.item.price)}</p>
            </div>
            <button onClick={() => removeCartItem(cartItem.id)} className={styles.removeCartItem}>
              <span className="material-symbols-outlined">
                close
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartFooter}>
        <p>Total: <span><b>${CurrencyFormatter.formatCurrency(totalCartPrice)}</b></span></p>
        <button className={styles.payButton} disabled={cart.items.length === 0} onClick={handlePay}>Pay</button>
      </div>
    </div>
  );
};

export default CartModal;

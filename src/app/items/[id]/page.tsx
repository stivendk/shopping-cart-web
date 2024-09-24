"use client";

import { useCart } from '@/app/hooks/use-cart';
import { AddCartItem } from '@/app/models/add-cart-item.request';
import { Item } from '@/app/models/item.model';
import { addItemToCart } from '@/app/services/cart-item.service';
import { getItemById } from '@/app/services/item.service';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles/item-detail.module.scss';
import { CurrencyFormatter } from '@/app/shared/format-currency';
import CartModal from '@/app/components/cart-modal';
import FloatingCartButton from '@/app/components/floating-cart-button';

const ItemDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const { cart, updateCartAfterAdd } = useCart();
  const [quantity, setQuantity] = useState(1);
  const formattedDate = item?.date ? new Date(item.date).toLocaleDateString('es-ES') : 'Sin fecha';
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);


  const toggleCartModal = () => {
    setIsCartModalOpen(prev => !prev);
  };

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        const fetchedItem = await getItemById(Number(id));
        setItem(fetchedItem);
      };
      fetchItem();
    }
  }, [id]);

  const addToCart = async () => {
    if (!item || !cart) return;
    if (item.status !== 'UNAVAILABLE') {
      const cartItem: AddCartItem = {
        itemId: item.id,
        cartId: cart.id,
        quantity,
      };

      await addItemToCart(cartItem);
      updateCartAfterAdd();
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false);
      }, 10000);
    }

  };

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <div>
        <button className={styles.backButton} onClick={() => router.back()}>
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </button>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>{item.name}</h1>
        <div className={styles.details}>
          <div className={styles.imageColumn}>
            <img src={item.urlImage} alt={item.name} className={styles.image} />
          </div>
          <div className={styles.infoColumn}>
            {item.type === 'EVENT' && <p>Date of Event: {formattedDate}</p>}
            <p><b>Stock: {item.stock}</b></p>
            <div className={styles.quantityControl}>
              <button className={styles.quantityButton} onClick={handleDecreaseQuantity}>
                <span className="material-symbols-outlined">
                  remove
                </span>
              </button>
              <div className={styles.quantityValue}>{quantity}</div>
              <button className={styles.quantityButton} onClick={handleIncreaseQuantity}>
                <span className="material-symbols-outlined">
                  add
                </span>
              </button>
            </div>
            <div className={styles.priceContainer}>
              <span>Price:</span>
              <span><b>${CurrencyFormatter.formatCurrency(item.price)}</b></span>
            </div>
            <button
              className={`${item.status === 'UNAVAILABLE' || item.stock <= 0 ? styles.disabledButton : styles.addToCartButton}`}
              onClick={addToCart}
            >
              {item.status === 'UNAVAILABLE' ? 'Out of stock' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
      <FloatingCartButton isUpdated={isUpdated} setIsUpdated={setIsUpdated} toggleCartModal={toggleCartModal} />
      {isCartModalOpen && <CartModal setIsUpdated={setIsUpdated} isUpdated={isUpdated} closeCartModal={toggleCartModal} />}
    </>
  );
};

export default ItemDetail;
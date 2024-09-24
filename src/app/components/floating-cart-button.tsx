"use client";

import React, { useEffect } from 'react';
import { useCart } from '../hooks/use-cart';
import styles from '../styles/floating-cart-button.module.scss';

interface FloatingCartButtonProps {
    toggleCartModal: () => void;
    isUpdated: boolean;
    setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ toggleCartModal, isUpdated, setIsUpdated }) => {
    const { cartItemsCount, updateCartAfterAdd } = useCart();

    useEffect(() => {
        updateCartAfterAdd().then(() => {
            setIsUpdated(false);
        });
    }, [isUpdated]);

    return (
        <div className={`${styles.floatingCartButton} ${isUpdated ? styles.animateCart : ''}`} onClick={toggleCartModal}>
            <span className={`material-symbols-outlined ${styles.iconBag}`}>
                local_mall
            </span>
            {cartItemsCount > 0 && (
                <span className={styles.cartItemCount}>{cartItemsCount}</span>
            )}
        </div>
    );
};

export default FloatingCartButton;

"use client";

import { useEffect, useState } from 'react';
import { getCartById } from '@/app/services/cart.service';
import { Cart } from '@/app/models/cart.model';
import { CurrencyFormatter } from '@/app/shared/format-currency';
import styles from '../../styles/invoice.module.scss';
import { useParams, useRouter } from 'next/navigation';

const InvoicePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [cart, setCart] = useState<Cart>({ id: 0, items: [], total: 0 });

    useEffect(() => {
        if (id) {
            const fetchCart = async () => {
                const cartData = await getCartById(Number(id));
                setCart(cartData);
            }
            fetchCart();
        }
    }, [id]);

    const backToHome = () => {
        router.push('/')
    };

    return (
        <>
            <div className={styles.paidCartPage}>
                <h1 className={styles.invoiceTitle}>Invoice N° {Number(id)}</h1>
                <div className={styles.cartContent}>
                    {cart.items.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImageContainer}>
                                <img src={item.item.urlImage} alt={item.item.name} className={styles.itemImage} />
                            </div>
                            <div className={styles.itemDetails}>
                                <strong>{item.item.name}</strong>
                                <span>Quantity: {item.quantity}</span>
                            </div>
                            <div className={styles.itemPrice}>
                                <strong>${CurrencyFormatter.formatCurrency(item.item.price)}</strong>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.cartFooter}>
                    <div className={styles.totalLabel}><strong>Total</strong></div>
                    <div className={styles.totalPrice}><strong>${CurrencyFormatter.formatCurrency(cart.total)}</strong></div>
                </div>
                <div className={styles.btnBack}>
                    <button onClick={backToHome}>Return to home</button>
                </div>
            </div>
        </>
    );
};

export default InvoicePage;

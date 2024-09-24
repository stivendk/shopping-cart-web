"use client";

import { useState, useEffect } from 'react';
import { getActiveCart, getAllCartItems, updateCart } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { deleteCartItem, updateCartItem } from '../services/cart-item.service';
import { CartItem } from '../models/cart.item.model';

export const useCart = () => {
    const [cart, setCart] = useState<Cart>({ id: 0, items: [], total: 0 });
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);


    const fetchActiveCart = async () => {
        const activeCart = await getActiveCart();
        setCart(activeCart);
    };

    const toggleCartModal = () => setIsCartModalOpen(prev => !prev);
    const closeCartModal = () => setIsCartModalOpen(false);

    const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
        const cartItem = cart.items.find(item => item.id === cartItemId);
        if (!cartItem) return;

        if (quantity === 0) {
            await removeCartItem(cartItem.id);
        }

        await updateCartItem(cartItemId, { itemId: cartItem.item.id, quantity });
        fetchActiveCart();
    };

    const removeCartItem = async (cartItemId: number) => {
        await deleteCartItem(cartItemId);
        fetchActiveCart();
    };

    const payCart = async () => {
        if (cart) {
            await updateCart(cart.id, { isPaymentUpdate: true });
            await fetchActiveCart();
        }
    };

    const updateCartAfterAdd = async () => {
        await fetchActiveCart();
    };

    useEffect(() => {
        fetchActiveCart();
    }, []);

    const totalCartPrice = cart.items.reduce((total, item) => total + item.price, 0) || 0;
    const cartItemsCount = cart.items.length || 0;


    return {
        cart,
        cartItemsCount,
        isCartModalOpen,
        toggleCartModal,
        closeCartModal,
        updateCartItemQuantity,
        removeCartItem,
        payCart,
        totalCartPrice,
        updateCartAfterAdd
    };
};

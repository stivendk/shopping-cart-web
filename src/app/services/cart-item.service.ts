import { AddCartItem } from "../models/add-cart-item.request";
import { UpdateCartItemRequest } from "../models/update-cart-item.request";

const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';

export const addItemToCart = async (addCartItem: AddCartItem): Promise<void> => {
    const response = await fetch(`${apiHost}/cart-items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addCartItem),
    });
    if (!response.ok) throw new Error('Failed to add item to cart');
};

export const updateCartItem = async (cartItemId: number, updateRequest: UpdateCartItemRequest): Promise<void> => {
    const response = await fetch(`${apiHost}/cart-items/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRequest),
    });
    if (!response.ok) throw new Error('Failed to update cart item');
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
    const response = await fetch(`${apiHost}/cart-items/${cartItemId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete cart item');
};
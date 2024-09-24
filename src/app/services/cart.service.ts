import { CartItem } from "../models/cart.item.model";
import { Cart } from "../models/cart.model";
import { UpdateCartRequest } from "../models/update-cart.request";

const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';

export const getActiveCart = async (): Promise<Cart> => {
  const response = await fetch(`${apiHost}/carts/active`);
  if (!response.ok) throw new Error('Failed to fetch active cart');
  return await response.json();
};

export const getCartById = async (cartId: number): Promise<Cart> => {
  const response = await fetch(`${apiHost}/carts/${cartId}`);
  if (!response.ok) throw new Error('Failed to fetch cart');
  return await response.json();
};

export const updateCart = async (cartId: number, updateRequest: UpdateCartRequest): Promise<void> => {
  const response = await fetch(`${apiHost}/carts/${cartId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateRequest),
  });
  if (!response.ok) throw new Error('Failed to update cart');
};

export const getAllCartItems = async (cartId: number): Promise<CartItem[]> => {
  const response = await fetch(`${apiHost}/cart-items/cart/${cartId}`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return await response.json();
};
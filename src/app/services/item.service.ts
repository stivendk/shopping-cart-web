import { Item } from "../models/item.model";

const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';

export const getAllItems = async (): Promise<Item[]> => {
  const response = await fetch(`${apiHost}/items`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return await response.json();
};

export const getItemById = async (id: number): Promise<Item> => {
  const response = await fetch(`${apiHost}/items/${id}`);
  if (!response.ok) throw new Error(`Item with ID ${id} not found`);
  return await response.json();
};

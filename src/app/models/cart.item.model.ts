import { Cart } from "./cart.model";
import { Item } from "./item.model";

export interface CartItem {
    id: number;
    item: Item;
    cart: Cart;
    quantity: number;
    price: number;
}
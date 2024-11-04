import { Cart } from "./Cart";
import { Tours } from "./Tours";

export class CartDetail {
    'cartDetailId': number;
    'quantity': number;
    'price': number;
    'tours': Tours;
    'cart': Cart;

    constructor(id: number, quantity: number, price: number, tours: Tours, cart: Cart) {
        this.cartDetailId = id;
        this.quantity = quantity;
        this.price = price;
        this.tours = tours;
        this.cart = cart;
    }
}

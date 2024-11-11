import { Cart } from "./Cart";
import { Tour } from "./Tour";

export class CartDetail {
    'cartDetailId': number;
    'quantity': number;
    'price': number;
    'tour': Tour;
    'cart': Cart;

    constructor(id: number, quantity: number, price: number, tour: Tour, cart: Cart) {
        this.cartDetailId = id;
        this.quantity = quantity;
        this.price = price;
        this.tour = tour;
        this.cart = cart;
    }
}

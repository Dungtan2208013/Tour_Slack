import { Customer } from "./Customer";
import { Tours } from "./Tours";

export class Favorites {
    'favoriteId': number;
    'user': Customer;
    'tours': Tours;

    constructor(id: number, user: Customer, tours: Tours) {
        this.favoriteId = id;
        this.tours = tours;
        this.user = user;
    }
}

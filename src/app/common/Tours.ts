import { Category } from "./Category";

export class Tours {
    'tourId':number;
    'name':string;
    'quantity': number;
    'price': number;
    'discount':number;
    'image': string;
    'description': string;
    'enteredDate': Date;
    'category': Category;
    'status': boolean;
    'sold': number;
    'duration': number;

    constructor(id:number) {
        this.tourId = id;
    }
}

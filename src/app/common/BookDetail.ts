import { Book } from "./Book";
import { Tour } from "./Tour";

export class BookDetail {
    'bookDetailId':number;
    'quantity':number;
    'price':number;
    'tour':Tour;
    'bookId': number;
    'startDate' :Date;
    'endDate' :Date;
        

    constructor(id: number) {
        this.bookDetailId = id;
    }
}

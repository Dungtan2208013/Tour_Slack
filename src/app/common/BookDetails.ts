import { Books } from "./Books";
import { Tours } from "./Tours";

export class BookDetails {
    'bookDetailId':number;
    'quantity':number;
    'price':number;
    'tours':Tours;
    'bookId': number;
    'start_date' :Date;
    'end_date' :Date;
        

    constructor(id: number) {
        this.bookDetailId = id;
    }
}

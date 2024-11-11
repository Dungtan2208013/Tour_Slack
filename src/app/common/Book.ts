import { Customer } from "./Customer";

export class Book {
    static bookId(bookId: any) {
      throw new Error('Method not implemented.');
    }
    'bookId': number;
    'bookDate': Date;
    'amount': number;
    'address': string;
    'phone': string;
    'status': number;
    'user': Customer;
    'start_date': String;
    'end_date' : String;
    'numberofTour': number;
  
}

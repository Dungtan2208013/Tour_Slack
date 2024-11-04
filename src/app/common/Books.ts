import { Customer } from "./Customer";

export class Books {
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
  
}

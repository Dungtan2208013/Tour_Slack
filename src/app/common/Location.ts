// import { Customer } from "./Customer";
import { Category } from "./Category";

export class Location{
    'locationId': number;
    'name': string;
    'description': string;
    'latitude': number;
    'longitude': number;
    'categoryId': number;
    'tourId': number;

    constructor(id:number) {
        this.locationId = id;
    }
}

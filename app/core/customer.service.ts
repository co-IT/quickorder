import { Customer } from "../models/customer";
import { Injectable } from "@angular/core";
import { CouchbaseService } from "./couchbase.service";

@Injectable()
export class CustomerService{
    customerDatabase: any;
    customer: Customer;

    constructor(private couchbase: CouchbaseService) {
        this.customerDatabase = couchbase.getDatabase();
    }

    getCustomerFromDatabase(){
        this.customer = this.customerDatabase.getDocument('customer');
        return this.customer;
    }

    setCustomer(customer: Customer){
        this.customer = customer;
        this.customerDatabase.createDocument(customer, 'customer');
    }


}
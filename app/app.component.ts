import { Component } from "@angular/core";
import { CouchbaseService } from "./core/couchbase.service";
import { CustomerService } from "./core/customer.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    protected static appVersion = "0.1.0"; 

   
    constructor( private customerService: CustomerService){
        this.customerService.customer = this.customerService.getCustomerFromDatabase();
    }
 }

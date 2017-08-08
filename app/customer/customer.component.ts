import {RouterExtensions} from 'nativescript-angular';


import { Component } from "@angular/core";
import { Customer } from "../models/customer";
import { CustomerService } from "../core/customer.service";

@Component({
    selector: 'customer',
    moduleId: module.id,
    templateUrl: './customer.component.html'
})
export class CustomerComponent {
    customer: Customer;

    constructor(private customerService: CustomerService, private router: RouterExtensions) {
        this.customer = this.customerService.customer;
        if(!this.customer){
            this.customer = new Customer('');
        }
    }

    setCustomer() {
        this.customerService.setCustomer(this.customer);
        this.router.navigate(['/'], {clearHistory: true});
    }


}
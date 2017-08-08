import {OrderService} from '../core/order.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular";
import { Http } from "@angular/http";
import { CustomerService } from "../core/customer.service";
import * as connectivity from "connectivity"

@Component({
    selector: 'scanned-twice-dialog',
    moduleId: module.id,
    template: `
    <StackLayout orientation="vertical" verticalAlignment="center" horizontalAlignment="center" margin=20>
        <Label *ngIf="!ordersuccess" textWrap="true" class="h2" text="Bestellung abschließen"></Label>
        <Label *ngIf="ordersuccess" textWrap="true" class="h2" text="Bestellung abgeschlossen"></Label>
        <Label *ngIf="!ordersuccess" class="h3" text="Eigene Bestellnummer hinterlegen (optional):"></Label>
        <TextField [isEnabled]="!loading" *ngIf="!ordersuccess" [(ngModel)]='customerOrderNumber'></TextField>
        <Label *ngIf="!connection" style="color: red;" class="h2" text="Keine Verbindung zum Internet"></Label>
        <Label *ngIf="noCustomerError" style="color: red;" class="h2" text="Kein Kunde hinterlegt"></Label>
        <StackLayout *ngIf="!ordersuccess" orientation="horizontal" horizontalAlignment="center">
            <Button text="Abbrechen" [isEnabled]="!loading" class ="control lg" (tap)="abort()"></Button>
            <Button [isEnabled]="connection && !noCustomerError && !loading" text="Senden" class="control lg" (tap)="sendOrder()"></Button>
        </StackLayout>
        <Button *ngIf="ordersuccess" text="Schließen" class ="control lg" (tap)="abort()"></Button>
        <Label *ngIf="loading" class="h3" text="Sende..."></Label>
        <Label *ngIf="ordersuccess" class="h3" text="Bestellung erfolgreich gesendet"></Label>
        <Label *ngIf="ordererror" class="h3" text="Fehler beim Senden der Bestellung"></Label>
    </StackLayout>
    `
})

export class ConfirmOrderDialogComponent implements OnDestroy, OnInit {
    customerOrderNumber: string;
    ordersuccess = false;
    ordererror = false;
    connection = false;
    noCustomerError = false;
    loading = false;

    constructor(private params: ModalDialogParams, private http: Http, private orderService: OrderService, private customerService: CustomerService) {
        let connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                this.connection = false;
                break;
            case connectivity.connectionType.wifi:
                this.connection = true;
                break;
            case connectivity.connectionType.mobile:
                this.connection = true;
                break;
            default:
                break;
        }
    }

    sendOrder(){
        this.loading = true;
        this.ordererror = this.ordersuccess = false;
        this.orderService.customerOrderNumber = this.customerOrderNumber;
        this.orderService.sendOrder(this.customerService.getCustomerFromDatabase())
        .subscribe(res=>{
            this.ordersuccess = true;
            this.loading = false;
            this.orderService.articles = [];
        }, err => {
            console.log(err);
            this.ordererror = true;
            this.loading = false;
        });
        
    }

    ngOnInit() {
        this.noCustomerError = false;
        connectivity.startMonitoring((newConnectionType: number) => {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    this.connection = false;
                    console.log("Connection type changed to none.");
                    break;
                case connectivity.connectionType.wifi:
                    this.connection = true;
                    console.log("Connection type changed to WiFi.");
                    break;
                case connectivity.connectionType.mobile:
                    this.connection = true;
                    console.log("Connection type changed to mobile.");
                    break;
                default:
                    break;
            }
        });

        if(!this.customerService.customer || !this.customerService.customer.id){
            this.noCustomerError = true;
        }
    }

    abort(){
        this.params.closeCallback();
    }

    ngOnDestroy(){
        connectivity.stopMonitoring();
    }

    
}
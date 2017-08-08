import {ArticleService} from './core/article.service';
import {NativeScriptFormsModule, NativeScriptHttpModule,  ModalDialogService,  NSModuleFactoryLoader} from 'nativescript-angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleListElementComponent } from "./article-list-element/article-list-element.component";
import { OrderService } from "./core/order.service";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { ArticleQuantityDialogComponent } from "./article-quantity/article-quantity.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { QuantitySetterComponent } from "./core/qantity-setter/quantity-setter.component";
import { ScannedTwiceDialogComponent } from "./scanned-twice-dialog/scanned-twice-dialog.component";
import { CustomerComponent } from "./customer/customer.component";
import { CouchbaseService } from "./core/couchbase.service";
import { CustomerService } from "./core/customer.service";
import { ConfirmOrderDialogComponent } from "./confirm-order-dialog/confirm-order-dialog.component";


export function provideBarcodeScanner() {
    return new BarcodeScanner();
}

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        ArticleListComponent,
        ArticleListElementComponent,
        ArticleQuantityDialogComponent,
        ArticleDetailComponent,
        QuantitySetterComponent,
        ScannedTwiceDialogComponent,
        CustomerComponent,
        ConfirmOrderDialogComponent
    ],
    providers: [
        OrderService,
        ArticleService,
        {provide: BarcodeScanner, useFactory: (provideBarcodeScanner)},
        NSModuleFactoryLoader,
        ModalDialogService,
        CouchbaseService,
        CustomerService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ScannedTwiceDialogComponent,ConfirmOrderDialogComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/

export class AppModule { }

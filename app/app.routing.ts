
import {ArticleQuantityDialogComponent} from './article-quantity/article-quantity.component';
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";


import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { CustomerComponent } from "./customer/customer.component";


const routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ArticleListComponent },
    { path: "quantity", component: ArticleQuantityDialogComponent },
    { path: 'item/:articleID', component: ArticleDetailComponent},
    { path: 'customer', component: CustomerComponent}
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
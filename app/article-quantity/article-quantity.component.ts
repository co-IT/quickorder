import {RouterExtensions} from 'nativescript-angular';
import {OrderService} from '../core/order.service';
import {Article} from '../models/article';

import { BarcodeScanner } from "nativescript-barcodescanner";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'article-quantity-dialog',
    moduleId: module.id,
    templateUrl:'./article-quantity.component.html'
})

export class ArticleQuantityDialogComponent {
    //barcodeScanner = new BarcodeScanner();
    article: Article;
    loading:boolean;
    articleBackup:Article;

    constructor(private ar: ActivatedRoute, private orderService: OrderService, private router: RouterExtensions) { 
        this.loading=true;
        this.ar.params.subscribe((params: Article) => {
            this.article = this.orderService.articles.find(a=> a.articleID === params.articleID);
            this.articleBackup = Object.assign({},this.article)
        })
        
        //this.article = this.orderService.articles.find(a=> a.articleID === '19111')
        }

    

    abort(){
        this.article = this.articleBackup;
        this.router.navigate(['/'],{clearHistory:true})
    }

 


}
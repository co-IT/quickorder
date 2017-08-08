import {Http} from '@angular/http';
import { Injectable } from "@angular/core";
import { Article } from "../models/article";
import { Customer } from "../models/customer";
import { environment } from "../environments/environment";

@Injectable()
export class OrderService {
    articles: Article[] = [
        /** new Article('11014', 'MU-112-000-4', 'stk', 50, 200),
        new Article('123456743', 'MU-008-000-4', 'stk', 50, 200),
        new Article('123423444', 'MU-180-000-4', 'stk', 50, 200),
        new Article('122342344', 'MU-130-000-4', 'stk', 50, 200),
        new Article('123454543', 'MU-115-000-2', 'stk', 50, 200)
        */
    ];

    constructor(private http: Http){
        this.articles = this.articles.map(a => {
            a.increment = 10;
            a.defaultAmount = 100;
            a.amount = 100
            return a;
        } )
    }

    customerOrderNumber = '';

    addArticle(article: Article) {
        this.articles.unshift(article);
    }

    removeArticle(article: Article) {
        this.articles. splice(this.articles.indexOf(this.articles.find(a => a.articleID === article.articleID)),1);
        console.log(this.articles);
    }

    sendOrder(customer: Customer){
        console.log(environment.sendmailURL)
       return this.http.post(environment.sendmailURL,{
        customer: customer,    
        order: {
                customerOrderNumber: this.customerOrderNumber,
                articles: this.articles
            }
       })
    }

}
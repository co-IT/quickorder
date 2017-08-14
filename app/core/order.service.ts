import {Http, Headers, URLSearchParams} from '@angular/http';
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
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const formatedOrder = this.formatOrder(customer);
        console.log(environment.sendmailURL)
        const body = new URLSearchParams();
        body.set('vorname', customer.name);
        body.set('nachname', '');
        body.set('sender', 'bestellApp@heco.de');
        body.set('receiver', environment.receiver);
        body.set('subject', 'Neue Bestellung per App');
        body.set('body', formatedOrder);
       return this.http.post(environment.sendmailURL,body.toString(),{headers: headers})
    }

    formatOrder(customer: Customer): string {
        return `<html encoding="UTF-8"><p><b>Kunde:</b> ${customer.name}<br />
        <p><b>Kundennummer:</b> ${customer.number}<br />
        <p><b>KundenID:</b> ${customer.id}<br />
        ${this.getCustomerOrderNumber(customer)}
        <br />
        ${this.iterateArticles()}
        </html>
        `
    }

    iterateArticles(): string{
        let articlesTemplate = ''
        this.articles.forEach(article => {
            articlesTemplate += `<div style="width:100%; marin-bottom: 10px;">
            <b>Artikel:</b> ${article.articleNumber} (ID: ${article.articleID})${this.getCustomerArticleNumber(article)}<br />
            <b>Menge:</b> ${article.amount}<br /><br />
            </div>`
        })
        return articlesTemplate;
    }

    getCustomerArticleNumber(article: Article): string {
        if(article.customerArticleNumber){
            return `
            <br /><b>Fremdartikelnummer: </b>${article.customerArticleNumber}`;
        } else 
        return ``;
    }

    getCustomerOrderNumber(customer: Customer):string {
        if(this.customerOrderNumber){
            return `<p><b>Kunden-Bestellnummer:</b> ${this.customerOrderNumber}<br /><br />`;
        } else 
            return ``; 
    }

}
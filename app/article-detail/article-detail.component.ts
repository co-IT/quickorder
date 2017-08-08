import {RouterExtensions} from 'nativescript-angular';
import {ArticleService} from '../core/article.service';
import {OrderService} from '../core/order.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Article} from '../models/article';

import { Component } from "@angular/core";

@Component({
    selector: 'article-detail',
    moduleId: module.id,
    templateUrl: './article-detail.component.html'
})

export class ArticleDetailComponent {
    article: Article;
    imageURL: string;
    description: string;
    constructor(private ar: ActivatedRoute, private orderService: OrderService, private articleService: ArticleService, private router: RouterExtensions) {
    this.ar.params.subscribe((params) => {
        
        this.article = this.orderService.articles.find(a=> a.articleID === params.articleID);
        this.articleService.getArticleData(this.article.articleID)
        .subscribe(data => {
            this.imageURL = data.imageURL
            this.description = data.description});
        //this.articleBackup = Object.assign({},this.article)
    })
}
removeArticle(article) {
    this.orderService.removeArticle(article);
    this.save();
}
save(){
    this.router.navigate(['/'],{clearHistory: true});
}
}
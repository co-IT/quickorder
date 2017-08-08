import { Component, Input } from "@angular/core";
import { Article } from "../models/article";
import { OrderService } from "../core/order.service";

@Component({
    selector: 'article-list-element',
    moduleId: module.id,
    templateUrl: 'article-list-element.component.html'
})

export class ArticleListElementComponent {
@Input() article: Article;

constructor(private orderService: OrderService) {}

removeArticle(article: Article){
    console.log(article.articleID);
    this.orderService.removeArticle(article);
}

}
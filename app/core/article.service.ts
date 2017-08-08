import { Injectable } from '@angular/core';
import {Http} from '@angular/http'

import 'rxjs/add/operator/map';
import { environment } from "../environments/environment";

@Injectable()
export class ArticleService {

    constructor(private http: Http) {}

    getArticleImageURL(articleID){
        return this.http.get(`${environment.articleDataURL}${articleID}/detail-data?lang=de`)
        .map(res=> res.json())
        .map(json => {
            return `${environment.articleImageURL}${json.Article.ArticleGroupId}.png`
        })
    }

    getArticleData(articleID){
        return this.http.get(`${environment.articleDataURL}${articleID}/detail-data?lang=de`)
        .map(res=> res.json())
        .map(json => {
            return { 
                imageURL:`${environment.articleImageURL}${json.Article.ArticleGroupId}.png`,
                description: json.Article.Description1
        }
    })
    }
}
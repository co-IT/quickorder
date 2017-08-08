import {ConfirmOrderDialogComponent} from '../confirm-order-dialog/confirm-order-dialog.component';
import {
    RouterExtensions,
    ModalDialogOptions,
    ModalDialogService
} from 'nativescript-angular';
import {
    Component,
    ViewContainerRef
} from "@angular/core";
import {
    OrderService
} from "../core/order.service";
import {
    Article
} from "../models/article";
import {
    BarcodeScanner
} from "nativescript-barcodescanner";
import {
    ArticleQuantityDialogComponent
} from "../article-quantity/article-quantity.component";
import {
    ScannedTwiceDialogComponent
} from "../scanned-twice-dialog/scanned-twice-dialog.component";
import { SnackBar, SnackBarOptions } from 'nativescript-snackbar';


@Component({
    selector: 'article-list',
    moduleId: module.id,
    templateUrl: 'article-list.component.html'
})

export class ArticleListComponent {
    items: Article[];
    currentArticle: Article;
    
    snackbar: SnackBar;
    options: SnackBarOptions = {
        actionText: 'Okay',
        actionTextColor: '#ff4081',
        snackText: 'keine Artikeldaten gefunden',
        hideDelay: 3500
      };
    constructor(
        public orderService: OrderService,
        private modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private barcodeScanner: BarcodeScanner,
        private router: RouterExtensions) {
        
        this.items = orderService.articles;
        this.snackbar = new SnackBar();
    }
    scan() {
        this.barcodeScanner.scan({
                formats: "QR_CODE",
                beepOnScan: true,
                cancelLabel: "Scannen abbrechen",
                message: "Jetzt Artikel scannen",
                showTorchButton: true, 
            })
            .then((result) => {
                console.log(result.text);
                result.text = result.text.trim();
                const parsedResult = JSON.parse(result.text)
                if(parsedResult && parsedResult.articleID && parsedResult.articleNumber && parsedResult.unit && parsedResult.increment && parsedResult.defaultAmount) {
                this.currentArticle =
                    new Article(parsedResult.articleID,
                        parsedResult.articleNumber,
                        parsedResult.unit,
                        parseInt(parsedResult.increment),
                        parseInt(parsedResult.defaultAmount)
                    );
                    return parsedResult;
                } else {
                    console.log('snack');
                    this.snackbar.action(this.options);
                    return Promise.reject(false);
                }
                
            }, err => {
                return err;
            })
            .then((parsedResult) => this.getConfirmation(parsedResult))
            .then((result) => {
                if (result === true || result == false) {
                    return Promise.reject(result);
                } else {
                    return Promise.resolve(result);
                }
            })
            .then((parsedResult) => {
                try {
                this.currentArticle.amount = parseInt(parsedResult.defaultAmount);
                this.currentArticle.customerArticleNumber = parsedResult.customerArticleNumber || undefined
                this.orderService.addArticle(this.currentArticle);
                this.showQuantityDialog(this.currentArticle);
                } catch(err) {
                    this.snackbar.action(this.options);
                    return Promise.reject(false);
                }
            })
            .catch(err => {
                console.log('catched',err);
                    if (err === true) {
                        this.router.navigate(['/item', this.currentArticle.articleID], {
                            clearHistory: true
                        })
                    } else {
                        this.router.navigate(['/'], {
                            clearHistory: true
                        })

                    }
                }
            )
    }

    showQuantityDialog(article: Article) {
        this.router.navigate(['/quantity', article], {
            clearHistory: true
        })
    }

    getConfirmation(parsedResult): Promise < any > {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true
        };
        console.log('confirm');
        if (this.orderService.articles.find(a => a.articleID === this.currentArticle.articleID)) {
            return this.modalService.showModal(ScannedTwiceDialogComponent, options)
        } else {
            return parsedResult;
        };
    }

    confirmOrder(){
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true
        };
        this.modalService.showModal(ConfirmOrderDialogComponent, options).then(() => {
            this.items = this.orderService.articles;
        })
    }
}
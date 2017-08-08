import { Component, Input } from "@angular/core";

@Component({
    selector: 'quantity-setter',
    moduleId: module.id,
    templateUrl:'./quantity-setter.component.html'
})

export class QuantitySetterComponent {
@Input() article;

increase(){
    this.article.amount += this.article.increment;
}


decrease(){
    this.article.amount -= this.article.increment;
}
}
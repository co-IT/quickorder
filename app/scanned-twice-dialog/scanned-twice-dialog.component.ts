

import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular";

@Component({
    selector: 'scanned-twice-dialog',
    moduleId: module.id,
    template: `
    <StackLayout orientation="vertical" verticalAlignment="center" horizontalAlignment="center" margin=20>
        <Label textWrap="true" class="h2" text="Der Artikel befindet sich bereits in Ihrer Bestellung"></Label>
        <Label class="h2" text="Möchen Sie die Menge ändern?"></Label>
        <StackLayout orientation="horizontal" horizontalAlignment="center">
            <Button text="Ja" class="control lg" (tap)="showDetails()"></Button>
            <Button text="Nein" class ="control lg" (tap)="abort()"></Button>
        </StackLayout>
    </StackLayout>
    `
})

export class ScannedTwiceDialogComponent {

    result:boolean;

    constructor(private params: ModalDialogParams) {
        
    }

    showDetails() {
        this.params.closeCallback(true);
    }

    abort(){
        this.params.closeCallback(false);
    }

}
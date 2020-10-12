import{Component, Output, EventEmitter} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:"app-header",
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    @Output() option = new EventEmitter<number>();

    constructor(private dataStorageService: DataStorageService){}

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
    onRecipesClick(){
        console.log("Recipes clicked");
        this.option.emit(1);
    }
    onShoppingListClick(){
        this.option.emit(2);
    }
    fetchRecipes(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
}
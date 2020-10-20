import{Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:"app-header",
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    isAuthenticated = false;
    @Output() option = new EventEmitter<number>();

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !user ? false : true;//!!user
        });
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

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
    onLogout(){
        this.authService.logout();
    }
}
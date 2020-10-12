import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.module';
import { RecipeService } from './recipes.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}
    //don't have to subscribe, resolve does it automatically
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
        
    }

}
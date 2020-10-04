import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipes.service';
import { ActivatedRoute, RouteConfigLoadEnd, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  //@Input() recipe:Recipe;
  recipe: Recipe;
  id: number;
  constructor(private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.gerRecipeById(this.id);
        }
      )
  }
  onAddSl(){
    this.recipeService.addIngredientsSL(this.recipe.ingredients);
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route});
    //another way is like this:
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    //this.router.navigate(['/recipes', this.id, 'edit']);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}

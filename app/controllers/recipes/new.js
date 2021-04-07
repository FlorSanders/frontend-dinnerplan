import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RecipesNewController extends Controller {
    @tracked recipeTitle = '';
    @tracked recipeDescription = '';
    @tracked recipeCategory = '';
    @tracked recipeCuisine = '';
    @tracked recipeDuration = '';
    @tracked recipeYield = '';
    @tracked recipeIngredients = ['', '', ''];
    @tracked recipeInstructions = ['', '', ''];

    @tracked recipeDiets = {
        'diabetic': false,
        'gluten free': false,
        'halal': false,
        'hindu': false,
        'kosher': false,
        'low calorie': false,
        'low fat': false,
        'low lactose': false,
        'low salt': false,
        'vegan': false,
        'vegetarian': false,
    }

    get diets() {
        console.log(Object.keys(this.recipeDiets))
        let diets = Object.keys(this.recipeDiets).map((diet) => ({
            name: diet,
            checked: this.recipeDiets[diet],  
        }));
        console.log(diets)
        return diets;
    }

    @action
    updateRecipeTitle(e) {
        this.recipeTitle = e.target.value;
    }

    @action
    updateRecipeDescription(e) {
        this.recipeDescription = e.target.value;
    }

    @action
    updateRecipeCategory(e) {
        this.recipeCategory = e.target.value;
    }

    @action
    updateRecipeCuisine(e) {
        this.recipeCusine = e.target.value;
    }

    @action
    updateRecipeDuration(e) {
        this.recipeDuration = e.target.value;
    }

    @action
    updateRecipeYield(e) {
        this.recipeYield = e.target.value;
    }

    @action
    updateRecipeDiet(e) {
        let diet = e.target.value;
        let checked = e.target.checked;
        this.recipeDiets[diet] = checked;
    }

    @action
    addRecipeIngredient() {
        this.recipeIngredients = [...this.recipeIngredients, ''];
    }

    @action
    removeRecipeIngredient(e) {
        let button = e.target;
        // Obtain the actual button (user can click on svg or path as well)
        switch(button.nodeName.toLowerCase()) {
            case 'button':
                button = button;
                break;
            case 'svg':
                button = button.parentNode;
                break;
            case 'path':
                button = button.parentNode.parentNode;
                break;
        }
        // Index of the ingredient to be removed
        let key = button.parentNode.attributes.key.nodeValue;
        // Update ingredients
        let ingredients = [...this.recipeIngredients];
        ingredients.splice(key, 1);
        this.recipeIngredients = ingredients;
    }

    @action 
    updateRecipeIngredients(e) {
        let key = e.target.attributes.key.nodeValue;
        this.recipeIngredients[key] = e.target.value;
    }

    @action
    addRecipeInstruction() {
        this.recipeInstructions = [...this.recipeInstructions, ''];
    }

    @action
    removeRecipeInstruction(e) {
        let button = e.target;
        // Obtain the actual button (user can click on svg or path as well)
        switch(button.nodeName.toLowerCase()) {
            case 'button':
                button = button;
                break;
            case 'svg':
                button = button.parentNode;
                break;
            case 'path':
                button = button.parentNode.parentNode;
                break;
        }
        // Index of the ingredient to be removed
        let key = button.parentNode.attributes.key.nodeValue;
        // Update ingredients
        let instructions = [...this.recipeInstructions];
        instructions.splice(key, 1);
        this.recipeInstructions = instructions;
    }

    @action 
    updateRecipeInstructions(e) {
        let key = e.target.attributes.key.nodeValue;
        this.recipeInstructions[key] = e.target.value;
    }

    @action
    save() {
        console.log("Submitting recipe")
    }

    @action
    reset() {
        this.recipeTitle = '';
        this.recipeDescription = '';
        this.recipeCategory = '';
        this.recipeCuisine = '';
        this.recipeDuration = '';
        this.recipeYield = '';
        this.recipeIngredients = ['', '', ''];
        this.recipeInstructions = ['', '', ''];
        this.recipeDiets.forEach((diet) => this.recipeDiets[diet] = false);
    }
}

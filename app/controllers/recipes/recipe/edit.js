import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RecipesRecipeEditController extends Controller {
  // Services
  @service store;
  @service session;
  @service router;
  // Tracked variables
  @tracked recipeTitle = '';
  @tracked recipeDescription = '';
  @tracked recipeCategory = '';
  @tracked recipeCuisine = '';
  @tracked recipeDuration = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  @tracked recipeYield = '';
  @tracked recipeIngredients = ['', '', ''];
  @tracked recipeInstructions = ['', '', ''];
  @tracked recipeDiets = {
    diabetic: false,
    'gluten free': false,
    halal: false,
    hindu: false,
    kosher: false,
    'low calorie': false,
    'low fat': false,
    'low lactose': false,
    'low salt': false,
    vegan: false,
    vegetarian: false,
  };
  @tracked fileName = null;
  // Other variables
  recipeId = null;
  confirmedLeave = true;
  newFile = false;
  file;

  constructor() {
    super(...arguments);

    // If the user leaves while there are unsaved changes, a warning should be given
    this.router.on('routeWillChange', (transition) => {
      // If we already confirmed, actually leave
      // Only block once, otherwise leaving is impossible
      if (this.confirmedLeave || transition.isAborted) {
        return;
      }
      // Only give the warning if there's actually text in the field
      if (!this.isReset()) {
        let leave = window.confirm('You have unsaved changes. Are you sure?');
        if (leave) {
          this.confirmedLeave = true;
        } else {
          transition.abort();
        }
      }
    });
  }

  async setProperties(model) {
    // Initialize the fields with model variables
    var {
      title,
      description,
      category,
      cuisine,
      duration,
      ingredient,
      diet,
    } = model.recipe;
    this.recipeTitle = title;
    this.recipeDescription = description;
    this.recipeCategory = category;
    this.recipeCuisine = cuisine;
    this.recipeDuration = duration;
    this.recipeYield = model.recipe.yield;
    this.recipeIngredients = ingredient;
    Object.keys(this.recipeDiets).forEach((recipeDiet) => {
      this.recipeDiets[recipeDiet] = diet === recipeDiet;
    });
    // Sketchy workaround: todo: fix this
    this.recipeInstructions = model.instructions.step.map((instruction) =>
      instruction.slice(3)
    );
    this.fileName = model.thumbnail.name;
    this.file = await this.store.findRecord('file', model.thumbnail.id);
    this.recipeId = model.recipe.id;
  }

  get diets() {
    let diets = Object.keys(this.recipeDiets).map((diet) => ({
      name: diet,
      checked: this.recipeDiets[diet],
    }));
    return diets;
  }

  isReset() {
    let {
      recipeTitle,
      recipeDescription,
      recipeCategory,
      recipeCuisine,
      recipeDuration,
      recipeYield,
      recipeIngredients,
      recipeInstructions,
      recipeDiets,
    } = this;
    let simpleFieldsEmpty =
      !recipeTitle &&
      !recipeDescription &&
      !recipeCategory &&
      !recipeCuisine &&
      !recipeYield;
    let durationEmpty = Object.values(recipeDuration).every((value) => !value);
    let dietsEmpty = Object.values(recipeDiets).every((value) => !value);
    let ingredientsEmpty = recipeIngredients.every((value) => !value);
    let instructionsEmpty = recipeInstructions.every((value) => !value);
    return (
      simpleFieldsEmpty &&
      durationEmpty &&
      dietsEmpty &&
      ingredientsEmpty &&
      instructionsEmpty
    );
  }

  @action
  uploadFile(file) {
    this.file = file;
    this.fileName = file.blob.name;
    this.newFile = true;
    this.confirmedLeave = false;
  }

  @action
  deleteFile() {
    this.file = null;
    this.fileName = '';
    this.newFile = false;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeTitle(e) {
    this.recipeTitle = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeDescription(e) {
    this.recipeDescription = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeCategory(e) {
    this.recipeCategory = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeCuisine(e) {
    this.recipeCuisine = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeDurationHours(e) {
    this.recipeDuration.hours = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeDurationMinutes(e) {
    this.recipeDuration.minutes = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeYield(e) {
    this.recipeYield = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  updateRecipeDiet(e) {
    let diet = e.target.value;
    let checked = e.target.checked;
    this.recipeDiets[diet] = checked;
    this.confirmedLeave = false;
  }

  @action
  addRecipeIngredient() {
    let ingredients = [...this.recipeIngredients, ''];
    this.recipeIngredients = ingredients;
    this.confirmedLeave = false;
  }

  @action
  removeRecipeIngredient(e) {
    let button = e.target;
    // Obtain the actual button (user can click on svg or path as well)
    switch (button.nodeName.toLowerCase()) {
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
    this.confirmedLeave = false;
  }

  @action
  updateRecipeIngredients(e) {
    let key = e.target.attributes.key.nodeValue;
    this.recipeIngredients[key] = e.target.value;
    this.confirmedLeave = false;
  }

  @action
  addRecipeInstruction() {
    let instructions = [...this.recipeInstructions, ''];
    this.recipeInstructions = instructions;
    this.confirmedLeave = false;
  }

  @action
  removeRecipeInstruction(e) {
    let button = e.target;
    // Obtain the actual button (user can click on svg or path as well)
    switch (button.nodeName.toLowerCase()) {
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
  async save() {
    // Check if the essential fields are valid
    if (this.isReset() || !this.recipeTitle) {
      window.alert('Please fill in all the fields');
      return;
    }
    // Fetch the user, recipe and instructions
    let recipe = await this.store.findRecord('recipe', this.recipeId);
    let instructions = await recipe.instructions;
    // Update the instructions record
    let instructionsArray = [...this.recipeInstructions]
      .filter((instruction) => instruction !== '')
      .map((instruction, index) => `${index}. ${instruction}`);
    instructions.step = instructionsArray;
    // Upload the file record
    let file = this.file;
    let storeFile = null;
    if (!!file) {
      if (this.newFile) {
        // Upload the file
        let response = await file.upload('/files/');
        // Verify the response is okay
        if (response.status === 201) {
          let id = response.body.data.id;
          storeFile = await this.store.findRecord('file', id);
        } else {
          console.error('File upload failed');
          window.alert('File upload failed');
        }
      } else {
        storeFile = file;
      }
    }
    // Update the recipe record
    let ingredientsArray = [...this.recipeIngredients].filter(
      (ingredient) => ingredient !== ''
    );
    let checkedDiets = Object.keys(this.recipeDiets).filter(
      (diet) => this.recipeDiets[diet]
    );
    let diet = !!checkedDiets.length ? checkedDiets[0] : null;
    recipe.title = this.recipeTitle;
    recipe.description = this.recipeDescription;
    recipe.duration = this.recipeDuration;
    recipe.category = this.recipeCategory;
    recipe.cuisine = this.recipeCuisine;
    recipe.ingredient = ingredientsArray;
    recipe.yield = this.recipeYield;
    recipe.diet = diet;
    recipe.image = storeFile;
    recipe.instructions = instructions;
    // Save the records
    await instructions.save();
    await recipe.save();
    // Leave
    this.confirmedLeave = true;
    this.router.transitionTo('recipes');
  }

  @action
  reset() {
    this.recipeTitle = '';
    this.recipeDescription = '';
    this.recipeCategory = '';
    this.recipeCuisine = '';
    this.recipeDuration = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.recipeYield = '';
    this.recipeIngredients = ['', '', ''];
    this.recipeInstructions = ['', '', ''];
    Object.keys(this.recipeDiets).forEach(
      (diet) => (this.recipeDiets[diet] = false)
    );
    this.deleteFile();
  }
}

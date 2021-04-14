import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import EmberResolver from 'ember-resolver';

export default class RecipeRoute extends Route {
  @service session;
  @service store;

  async beforeModel() {
    await this.session.refresh();
    if (!this.session.loggedIn) {
      this.transitionTo('home');
    }
  }

  async model(arg) {
    let slug = arg.id;
    let recipes = this.modelFor('recipes');
    let recipeId = recipes.filter((recipe) => recipe.slug === slug)[0].id;
    let recipe = await this.store.findRecord('recipe', recipeId);
    let instructions = await recipe.instructions;
    let image = await recipe.image;
    let thumbnail = null;
    if (!!image) {
      thumbnail = new Image();
      thumbnail.src = `/files/${image.id}/download`;
      thumbnail.classList = 'w-100 h-80 rounded mb-5';
      thumbnail.id = image.id;
      thumbnail.name = image.name;
    }

    return { recipe, instructions, thumbnail };
  }
}

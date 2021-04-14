import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { dasherize } from '@ember/string';

export default class RecipesRoute extends Route {
  @service session;
  @service store;

  async beforeModel() {
    await this.session.refresh();
    if (!this.session.loggedIn) {
      this.transitionTo('home');
    }
  }

  async model() {
    let id = this.session.userId;
    let user = await this.store.findRecord('user', id);
    let recipes = await user.recipes;
    return recipes.map((recipe) => ({
      title: recipe.title,
      slug: dasherize(recipe.title),
      id: recipe.id,
    }));
  }
}

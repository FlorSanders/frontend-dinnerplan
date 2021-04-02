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

    async model(arg) {
        let slug = arg.id;
        let recipes = this.modelFor('recipes');
        let recipeId = recipes.filter((recipe) => (recipe.slug === slug))[0].id;
        let recipe = await this.store.findRecord('recipe', recipeId);
        let instructions = await recipe.instructions;
        return {recipe, instructions};
    }
}

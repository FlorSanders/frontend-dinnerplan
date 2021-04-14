import Route from '@ember/routing/route';

export default class RecipesRecipeEditRoute extends Route {
    async model() {
        let recipe = await this.modelFor('recipes.recipe');
        return recipe;
    }

    setupController(controller, model) {
        controller.setProperties(model);
    }
}

import Route from '@ember/routing/route';

export default class RecipesNewRoute extends Route {
  // Take singleton behaviour into account and reset the controller before leaving
  resetController(controller) {
    controller.reset();
    controller.confirmedLeave = false;
  }
}

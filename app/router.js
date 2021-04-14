import EmberRouter from '@ember/routing/router';
import config from 'frontend-dinnerplan/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('home', { path: '/' });
  this.route('signup');
  this.route('recipes', function () {
    this.route('recipe', { path: '/:id' }, function () {
      this.route('edit');
    });
    this.route('new');
  });
  this.route('account');
});

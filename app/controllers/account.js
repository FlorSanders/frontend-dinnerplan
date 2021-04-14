import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AccountController extends Controller {
  @service session;
  @service router;
  @tracked username = '';
  @tracked password = '';

  @action
  async logout() {
    let result = await this.session.logout();
    if (result) {
      this.router.transitionTo('home');
    } else {
      console.error('Unable to log out');
      alert('Unable to log out');
    }
  }
}

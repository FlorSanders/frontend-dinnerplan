import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class NavbarComponent extends Component {
  @service session;
  @service router;
  @tracked menuOpen = false;

  get loggedIn() {
    this.session.refresh();
    return this.session.loggedIn;
  }

  get avatar() {
    return this.session.name[0];
  }

  @action
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @action
  async logout() {
    let result = await this.session.logout();
    if (result) {
      this.menuOpen = false;
      this.router.transitionTo('home');
    }
  }
}

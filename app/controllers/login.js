import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
    @service session;
    @tracked username = '';
    @tracked password = '';

    get isLoggedIn(){
        let id = this.session.session.id;
        return !!id;
    }

    @action
    updateUsername(e) {
        this.username = e.target.value;
    }

    @action
    updatePassword(e) {
        this.password = e.target.value;
    }

    @action login(){
        console.log(`Log in using ${this.username} and ${this.password}`);
        this.session.login(this.username, this.password);
    }
}

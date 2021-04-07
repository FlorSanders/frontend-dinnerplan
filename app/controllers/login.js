import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
    @service session;
    @service router;
    @tracked username = '';
    @tracked password = '';

    @action
    updateUsername(e) {
        this.username = e.target.value;
    }

    @action
    updatePassword(e) {
        this.password = e.target.value;
    }

    @action 
    async login(){
        let result = await this.session.login({username: this.username, password: this.password});
        if(result){
            this.router.transitionTo('home');
        } else {
            console.warn("Unable to log in");
            alert("Please enter valid login details, or register.")
        }
    }
}

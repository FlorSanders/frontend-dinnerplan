import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
    @service session;
    @tracked username = '';
    @tracked password = '';

    get isLoggedIn(){
        this.session.refresh();
        return this.session.loggedIn;
    }

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
        let result = await this.session.login(this.username, this.password);
        if(result){
            console.log(`Login result ${result}`);
        } else {
            console.warn("Unable to log in");
            alert("Please enter valid login details, or register.")
        }
    }

    @action 
    async logout(){
        let result = await this.session.logout();
        if(result){
            console.log(`Logout result ${result}`);
        } else {
            console.error("Unable to log out");
            alert("Unable to log out");
        }
    }
}

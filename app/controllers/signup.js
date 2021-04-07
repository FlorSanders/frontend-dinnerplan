import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SignupController extends Controller {
    @service session;
    @service router;
    @tracked name = '';
    @tracked username = '';
    @tracked password = '';
    @tracked confirmPassword = '';

    @action 
    updateName(e) {
        this.name = e.target.value;
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
    updateConfirmPassword(e) {
        this.confirmPassword = e.target.value;
    }

    @action
    async signup(){
        let {name, username, password, confirmPassword} = this;
        if(password === confirmPassword) {
            let result = await this.session.register({
                name,
                nickname: username,
                password,
                confirmPassword,
            });
            if (result) {
                this.router.transitionTo('login');
            } else {
                console.error("Unable to sign up");
                alert("Unable to sign up due to invalid request");
            }
        } else {
            console.warn("Unable to sign up");
            alert("Passwords don't match");
        }
    }
}

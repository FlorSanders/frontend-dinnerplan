import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class SessionService extends Service {
    @tracked name = '';
    @tracked nickname = '';
    @tracked id = '';
    @tracked loggedIn = false;

    // Refresh the session
    async refresh() {
        let id = '';
        let url = '/sessions/current';
        let response = await fetch(url, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
            }
        });
        if(response.ok) {
            let data = await response.json();
            id = data.relationships.account.data.id || '';
        }
        if(this.id !== id) this.updateSession(id);
    }

    // Session changed --> update variables
    async updateSession(id){
        // Check if the new id is valid
        if(!!id) {
            // Session swithed to new valid id
            // Fetch account info
            let accountUrl = `/accounts/${id}`;
            let accountResponse = await fetch(accountUrl, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                }
            });
            if(accountResponse.ok) {
                let accountData = await accountResponse.json();
                let nickname = accountData.data.attributes.name;
                // Fetch user info
                let ownerUrl = accountData.data.relationships.owner.links.self;
                let ownerResponse = await fetch(ownerUrl, {
                    headers: {
                        'Content-Type': 'application/vnd.api+json',
                    }
                });
                if(ownerResponse.ok) {
                    let ownerData = await ownerResponse.json();
                    let name = ownerData.data.attributes.name;
                    // Update the session information
                    this.name = name;
                    this.nickname = nickname;
                    this.id = id;
                    this.loggedIn = true;
                } else {
                    console.error("Unable to fetch user info");
                    alert("Unable to fetch user info");
                    this.reset();
                }
            } else {
                console.error("Unable to fetch user info");
                alert("Unable to fetch user info");
                this.reset();
            }
        } else {
            this.reset();
        }
    }


    // Log in at the backend
    async login(username, password) {
        // If we're logged in, return
        await this.refresh();
        if(this.loggedIn) return;
        // Log in to the backend service + create a session for the frontend
        let url = '/sessions';
        let payload = {
            data: {
                type: 'sessions',
                attributes: {
                    nickname: username,
                    password: password,
                },
            },
        };
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(payload),
        });
        if(response.ok) {
            this.refresh()
        } else {
            console.warn("Unable to log in")
            alert("Please enter valid login details, or register.")
        }
    }
    
    // Log out of the backend
    async logout() {
        // Check if we're logged in
        await this.refresh();
        if(this.loggedIn) {
            // Log out request
            let url = '/sessions/current';
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                },
            });
            if(response.ok) {
                this.reset();
            } else {
                console.error("Unable to log out");
                alert("Unable to log out");
            }
        } else {
            // Already logged out somehow, just reset the session
            this.reset()
        }
    }

    // Reset all session variables to their default value
    reset() {
        this.name = '';
        this.nickname = '';
        this.id = '';
        this.loggedIn = false;
    }
}

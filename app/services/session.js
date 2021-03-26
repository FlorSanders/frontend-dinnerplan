import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class SessionService extends Service {
    @tracked session = {
        name: '',
        id: '',
    };

    async login(username, password) {
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
            console.log(response)
        }
    }
}

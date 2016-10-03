import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Login {
    constructor(authService) {
        this.authService = authService;
    };

    heading = 'Login';   

    authenticate(name) {
        return this.authService.authenticate(name)
            .then(response => {
                
                console.log(`BOOGA-Auth:${this.authService.isAuthenticated()}`);

                if (this.authService.isAuthenticated()) {
                    return this.authService.getMe()
                        .then(data => {		 

                            console.log(data);

                        });		 
                } 
            });
    }
}
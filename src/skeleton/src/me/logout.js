import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {Configure} from 'aurelia-configuration';

@inject(AuthService, Configure)
export class Logout {
    constructor(authService, config) {
        this.authService = authService;
        this.config = config;
    };

    activate() {
        let self = this;

        this.authService.logout("#/")
		    .then(response=> {
		        console.log('Logged out from portal');

		        this.endIdentityServerSession();
		    })
		    .catch(err => {
                console.log('Error logging out from portal');
                console.log(err);
		    });
    }

    endIdentityServerSession() {
        // Attempt to clear the identity server cookie as well
        // Note: this isn't really necessary and could ultimately
        // be undesirable as it's logging the user out of the identity server
        // and not just this application.
        let iframe = document.createElement('iframe');
        iframe.src = `${this.config.get('identity.endpoint')}account/logout`;
        iframe.onload = function() {
            this.parentNode.removeChild(this);
        };

        document.getElementById('invisible').appendChild(iframe);
    }
}
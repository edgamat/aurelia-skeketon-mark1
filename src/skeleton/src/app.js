import {AuthenticateStep} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import nprogress from 'nprogress';

@inject(HttpClient)
export class App {
    isRequesting = false;

    constructor(http) {
        this.http = http;
        nprogress.configure({ showSpinner: false }); 
    }

    configureRouter(config, router) {
        config.title = 'Chrysalis - Mark 1';
        config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter to the authorize extensibility point.
        config.map([
            { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true,  title: 'Welcome' },
            { route: 'login', moduleId: './me/login', nav: false, title:'Login' },
            { route: 'logout', moduleId: './me/logout', nav: false, title:'Logout' },
            { route: 'roles',         name: 'roles',        moduleId: 'roles/roles-section',   nav: true,  title: 'Role Manager' },
            { route: 'users',         name: 'users',        moduleId: 'users/users-section',   nav: true,  title: 'User Manager' }
]);

        this.router = router;
    }
   
    activate() {
        this.addProgressBarToHttpRequests();        
    }
        
    addProgressBarToHttpRequests() {
        // Add the progress bar for requests
        this.http.configure(config => {
            config 
                .withInterceptor({
                    request: (request) => { 
                        this.isRequesting = true;                           
                        return request; 
                    },        
                    requestError: (requestError) => { 
                        this.isRequesting = false;                          
                        return requestError; 
                    },   
                    response: (response) => { 
                        this.isRequesting = false;  
                        
                        if (response.status == 401) {
                            this.router.navigate('login');
                            throw response;
                        }
                        else {
                            return response; 
                        }
                    },
                    responseError: (responseError) => { 
                        this.isRequesting = false;  
                        return responseError; 
                    }
                });
        });  
    }
}

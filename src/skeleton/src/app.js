import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import nprogress from 'nprogress';

@inject(HttpClient)
export class App {
    isRequesting = false;

    constructor(http) {
        this.http = http;
        //// nprogress.configure({ showSpinner: true }); 
    }

    configureRouter(config, router) {
        config.title = 'Chrysalis - Mark 1';
        config.map([
            { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true,  title: 'Welcome' },
            { route: 'users',         name: 'users',        moduleId: 'users',        nav: true,  title: 'Github Users' },
            { route: 'users/create',  name: 'users-create', moduleId: 'users-create', nav: false, title: 'Create User' },
            { route: 'users/:id/detail', name: 'users-detail', moduleId: 'users-detail', nav: false },
            { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true,  title: 'Child Router' },
            { route: 'roles',         name: 'roles',        moduleId: 'roles/roles-section',   nav: true,  title: 'Role Manager' }
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

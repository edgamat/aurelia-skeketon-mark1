import {inject} from 'aurelia-framework';
import {Configure} from 'aurelia-configuration';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, Configure)
export class RolesService {

    baseApiController = 'roles';

    constructor(http, config) {
        this.http = http;      
        this.config = config;
        
        this.baseApiEndpointUrl = window.isIELessThanTen ? config.get('api.endpointProxy') : config.get('api.endpoint');  
        this.baseUrl = `${this.baseApiEndpointUrl}${this.baseApiController}`;

        console.log(this.baseUrl);
    }    

    getRoles() {
        return this.http.fetch(`${this.baseUrl}`)
            .then(data => { return data });
    }

    roleExists(roleName) {
        if (roleName === null || roleName === undefined) {
            return false;
        }

        if (roleName === "Admin") {
            return true;
        }

        return false;
    }

}
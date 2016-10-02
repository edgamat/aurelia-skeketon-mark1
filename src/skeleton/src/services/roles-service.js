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

    getRoleById(id) {
        return this.http.fetch(`${this.baseUrl}/${id}`)
            .then(data => { return data });
    }

    createRole(data) {
        let verb = 'post';
        let route = `${this.baseUrl}`;
        
        return this.http.fetch(route, {
            method: verb,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                return response.json()
                    .then(json => {
                        throw new Error(response.status, json);
                    })
                    .catch(ex => {
                        throw new Error(response.status, ex.message);
                    });
            }

            return response;               
        });
    };

    deleteRole(id) {
        let verb = 'delete';
        let route = `${this.baseUrl}/${id}`;
        
        return this.http.fetch(route, {
            method: verb,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                return response.json()
                    .then(json => {
                        throw new Error(response.status, json);
                    })
                    .catch(ex => {
                        throw new Error(response.status, ex.message);
                    });
            }

            return response;               
        });
    };

    updateRole(id, data) {
        let verb = 'put';
        let route = `${this.baseUrl}/${id}`;
        
        return this.http.fetch(route, {
            method: verb,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                return response.json()
                    .then(json => {
                        throw new Error(response.status, json);
                    })
                    .catch(ex => {
                        throw new Error(response.status, ex.message);
                    });
            }

            return response;               
        });
    };

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
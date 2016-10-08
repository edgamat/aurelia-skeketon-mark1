import {inject} from 'aurelia-framework';
import {Configure} from 'aurelia-configuration';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, Configure)
export class UsersService {

    baseApiController = 'users';

    constructor(http, config) {
        this.http = http;
        this.config = config;

        this.baseApiEndpointUrl = window.isIELessThanTen ? config.get('api.endpointProxy') : config.get('api.endpoint');
        this.baseUrl = `${this.baseApiEndpointUrl}${this.baseApiController}`;

        console.log(this.baseUrl);
    }

    getUsers() {
        var route = `${this.baseUrl}/UserRecords`;

        return this.http.fetch(route)
            .then(data => { return data });
    }

    getUserRecordsForPagination(startIDX,endIDX) {

        var route = `${this.baseUrl}/UserRecordsForPagination?startIdx=${startIDX}&endIdx=${endIDX}`;

        return this.http.fetch(route)
            .then(data => { return data });
    }
}
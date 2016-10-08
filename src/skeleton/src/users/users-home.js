import {inject} from 'aurelia-framework';
import {UsersService} from '../services/users-service.js';

@inject(UsersService)
export class UsersHome {
    heading = "User Manager";

    constructor(usersService) {
        this.usersService = usersService;

        // record setting properties
        this.pageSize = 10;
        this.startIndex = 1;
        this.endIndex = this.pageSize;

        // these properties control the previous and next buttons enabling behaviour
        this.disableStart = true;
        this.disableEnd = false;

        // this property will store the total user records count
        this.userRecordCount = 0;

        // this property will store the user records
        this.userRecords = null;

        this.startCss = "previous disabled";
        this.endCss = "next";
    }

    activate() {
        // invoke this function when page loads.
        this.currentUserRecords();
    }

    //this method will be invoked on page load
    currentUserRecords()
    {
        this.getUserRecords(this.startIndex, this.endIndex);

        if (this.endIndex <= this.userRecordCount) {
            this.disableEnd = true;
            this.endCss = "next disabled";
        }
    }

    //this method will be called when Previous button is clicked
    prevUserRecords()
    {
        if (this.disableStart) {
            return;
        }

        this.startIndex = this.startIndex - this.pageSize ;
        this.endIndex = this.endIndex - this.pageSize ;

        if (this.startIndex == 1) {
            this.disableStart = true;
            this.startCss = "previous disabled";

            this.getUserRecords(this.startIndex, this.endIndex);

        } else {
            this.disableEnd = false;
            this.endCss = "next";
            this.getUserRecords(this.startIndex, this.endIndex);
        }

    }

    //this method will be called when Next button is clicked
    nextUserRecords()
    {
        if (this.disableEnd) {
            return;
        }

        this.startIndex = this.startIndex + this.pageSize;
        this.endIndex = this.endIndex + this.pageSize;

        if(this.endIndex >= this.userRecordCount) {

            this.disableEnd = true;
            this.endCss = "next disabled";

            this.getUserRecords(this.startIndex,this.endIndex);
        } else {
            this.disableStart = false;
            this.startCss = "previous";

            this.getUserRecords(this.startIndex,this.endIndex);
        }
    }

    //this method fetches the user records for a particular range specified.It uses http-fetch client
    getUserRecords(startIDX,endIDX)
    {
        console.log(`startIDX=${startIDX}, endIDX=${endIDX}`);
        this.usersService.getUserRecordsForPagination(startIDX,endIDX)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.userRecordCount = data.recordCount;
                this.userRecords = data.users;
            });
    }
}

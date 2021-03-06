import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController} from "aurelia-validation";
import {RolesService} from '../services/roles-service.js';
import {Router} from 'aurelia-router';

@inject(NewInstance.of(ValidationController), RolesService, Router)
export class RoleCreate {
    heading = 'Add Role';

    roleName = "";

    userRoles = [];

    assignedPermissions = [];

    unassignedPermissions = [];

    constructor(controller, rolesService, router) {

        this.controller = controller;
        this.rolesService = rolesService;
        this.router = router;

        ValidationRules.customRule(
          'duplicate',
            (value, obj) => value !== null && value !== undefined && !this.rolesService.roleExists(value),
            `\${$displayName} already exists. Please make another selection!`);
        ValidationRules
            .ensure(m => m.roleName)
            .required()
            .satisfiesRule('duplicate')
            .on(this);

    }

    activate() {

        this.unassignedPermissions = 
        [
            { permissionId: 1, permissionName: "ACCOUNT VIEW" },
            { permissionId: 2, permissionName: "ACCOUNT UPDATE" },
            { permissionId: 3, permissionName: "ACCOUNT CREATE" },
            { permissionId: 4, permissionName: "ACCOUNT DELETE" }
        ];

    }

    attached() {
        console.log(this.ds);
    }

    save(e) {

        this.controller
            .validate()
            .then(v => {
                if (v.length === 0) {
                    console.log("All is good!");

                    let data = { 
                        roleName: this.roleName, 
                        permissions: this.assignedPermissions 
                    };

                    console.log("save ASSIGNED:");
                    this.assignedPermissions.forEach(function (li) {
                        console.log(li.permissionName);
                    });

                    console.log("save UNASSIGNED:");
                    this.unassignedPermissions.forEach(function (li) {
                        console.log(li.permissionName);
                    });

                    this.rolesService.createRole(data)
                       .then((result) => {
                           console.log(result);
                           this.router.navigate('role-home');
                       });
                }
                else {
                    console.log("You have errors!");
                }
            });
    };

}

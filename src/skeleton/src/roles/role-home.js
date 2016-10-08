import {inject} from 'aurelia-framework';
import {RolesService} from '../services/roles-service.js';

@inject(RolesService)
export class RoleHome {
    heading = 'Role Manager';

    selectedRoleId = 0;

    selectedRole = null;

    roles = [];

    userRoles = [];

    assignedPermissions = [];

    unassignedPermissions = [];

    constructor(rolesService) {
        this.rolesService = rolesService;
    }

    activate() {

        this.rolesService.getRoles()
            .then(response => response.json())
            .then(data => {
                this.roles = data;

                if (this.roles && this.roles.length > 0) {

                    this.selectedRoleId = this.roles[0].roleId;

                    this.selectedRoleChange(null);
                }
            });
    }

    attached() {
        console.log(this.ds);
    }

    selectedRoleChange(e) {
        console.log(e);

        this.rolesService.getRoleById(this.selectedRoleId)
            .then(response => response.json())
            .then(data => {
                this.selectedRole = data.role;
                this.assignedPermissions = data.assignedPermissions;
                this.unassignedPermissions = data.unassignedPermissions;

                console.log(data);
            });
    };

    deleteHandler(e) {

        this.rolesService.deleteRole(this.selectedRoleId)
           .then((result) => {
               console.log(result);
               this.activate();
           });

    };

    saveHandler(e) {

        let data = this.selectedRole;

        data.permissions = this.assignedPermissions;

        this.rolesService.updateRole(this.selectedRoleId, data)
           .then((result) => {
               console.log(result);
           });

        console.log("ASSIGNED:");
        this.assignedPermissions.forEach(function (li) {
            console.log(li.permissionName);
        });

        console.log("UNASSIGNED:");
        this.unassignedPermissions.forEach(function (li) {
            console.log(li.permissionName);
        });
    };

}

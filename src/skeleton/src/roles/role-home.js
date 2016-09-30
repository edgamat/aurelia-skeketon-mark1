
export class RoleHome {
    heading = 'Role Manager';

    selectedRoleId = 1;

    roles = [];

    userRoles = [];

    assignedPermissions = [];

    unassignedPermissions = [];

    constructor() {

    }

    activate() {

        this.roles = 
        [
            { roleId: 1, roleName: "Admin" },
            { roleId: 2, roleName: "Manager" },
            { roleId: 3, roleName: "Analyst" }
        ];

        this.userRoles = 
        [
            { userId: 1, userName: "DOEJ", fullName: "John Doe" },
            { userId: 2, userName:"SECORDC", fullName: "Cliff Secord" }
        ];

        this.assignedPermissions = 
        [
            { permissionId: 1, permissionName: "ACCOUNT VIEW" },
            { permissionId: 2, permissionName: "ACCOUNT UPDATE" }
        ];

        this.unassignedPermissions = 
        [
            { permissionId: 3, permissionName: "ACCOUNT CREATE" },
            { permissionId: 4, permissionName: "ACCOUNT DELETE" }
        ];

    }

    attached() {
        console.log(this.ds);
    }
 
    selectedRoleChange(e) {
        console.log(e);

        if (this.selectedRoleId === 2) {
            this.userRoles = 
            [
                { userId: 3, userName: "DOEJA", fullName: "Jane Doe" },
                { userId: 4, userName:"SECORDJ", fullName: "Jenny Secord" }
            ];
        }
    };

    save(e) {

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

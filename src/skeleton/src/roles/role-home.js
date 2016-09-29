
export class RoleHome {
    heading = 'Role Manager';

    selectedRoleId = 1;

    assignedPermissionList = [];

    unassignedPermissionList = [];

    roles = 
    [
        { roleId: 1, roleName: "Admin" },
        { roleId: 2, roleName: "Manager" },
        { roleId: 3, roleName: "Analyst" }
    ];

    userRoles = 
    [
        { userId: 1, userName: "DOEJ", fullName: "John Doe" },
        { userId: 2, userName:"SECORDC", fullName: "Cliff Secord" }
    ];

    assignedPermissions = 
    [
        { permissionId: 1, permissionName: "ACCOUNT VIEW" },
        { permissionId: 2, permissionName: "ACCOUNT UPDATE" }
    ]

    unassignedPermissions = 
    [
        { permissionId: 3, permissionName: "ACCOUNT CREATE" },
        { permissionId: 4, permissionName: "ACCOUNT DELETE" }
    ]

    movePermission(e, action) {
        console.log(action);

        if (action === "removeAll") {
            for (var i = 0; i < this.unassignedPermissions.length; i++) {
                this.assignedPermissions.push(this.unassignedPermissions[i]);
            }

            this.unassignedPermissions = [];
        }

        if (action === "addAll") {
            for (var i = 0; i < this.assignedPermissions.length; i++) {
                this.unassignedPermissions.push(this.assignedPermissions[i]);
            }

            this.assignedPermissions = [];
        }

        if (action === "add") {

            let itemsToRemove = [];

            for (var i = 0; i < this.assignedPermissionList.length; i++) {
                
                console.log(this.assignedPermissionList[i]);

                let itemToRemove = this.assignedPermissions.indexOf(this.assignedPermissionList[i]);

                //// this.unassignedPermissions.push(this.assignedPermissions[itemToRemove]);

                //// itemsToRemove.push(this.assignedPermissions.indexOf(this.assignedPermissions[i]));

                console.log(itemToRemove);

                //// works: this.assignedPermissions.splice(itemsToRemove[i], 1);
                //// this.assignedPermissions.splice(itemsToRemove[i], 1);
            }

            for (var i = 0; i < itemsToRemove.length; i++) {
                //// this.assignedPermissions.splice(itemsToRemove[i], 1);
            }
        }

        this.assignedPermissionList.forEach(function (li) {
            console.log(li);
        });


        for (var i = 0; i < this.assignedPermissionList.length; i++) {
            console.log(this.assignedPermissionList[i]);
        }

        for (var i = 0; i < unassignedPermissionList.length; i++) {
            ////console.log(unassignedPermissionList[i].selected);
        }

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

}

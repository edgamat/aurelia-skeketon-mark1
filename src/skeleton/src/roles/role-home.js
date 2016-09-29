
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

        if (action === "addAll") {
            for (var i = 0; i < this.unassignedPermissions.length; i++) {
                this.assignedPermissions.push(this.unassignedPermissions[i]);
            }
            
            this.unassignedPermissions = [];
        }

        if (action === "removeAll") {
            for (var i = 0; i < this.assignedPermissions.length; i++) {
                this.unassignedPermissions.push(this.assignedPermissions[i]);
            }

            this.assignedPermissions = [];
        }

        if (action === "remove") {
            for (var i = 0; i < this.assignedPermissionList.length; i++) {
                let itemToRemove = this.assignedPermissions.indexOf(this.assignedPermissionList[i]);
                this.unassignedPermissions.push(this.assignedPermissions[itemToRemove]);
                this.assignedPermissions.splice(itemToRemove, 1);
            }
        }

        if (action === "add") {
            for (var i = 0; i < this.unassignedPermissionList.length; i++) {
                let itemToRemove = this.unassignedPermissions.indexOf(this.unassignedPermissionList[i]);
                this.assignedPermissions.push(this.unassignedPermissions[itemToRemove]);
                this.unassignedPermissions.splice(itemToRemove, 1);
            }
        }

        this.sortPermissions(this.assignedPermissions);
        this.sortPermissions(this.unassignedPermissions);
    }

    sortPermissions(permissions) {
        
        if (Object.prototype.toString.call(permissions) !== '[object Array]' ) {
            throw new Error("Invalid Input");
        };

        permissions.sort(function (a, b) {
            if (a.permissionName < b.permissionName) return -1;
            if (a.permissionName > b.permissionName) return 1;
            return 0;
        });
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

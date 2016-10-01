import {customElement, bindable} from 'aurelia-framework';

@customElement("dual-select")
export class DualSelect {

    @bindable assignedPermissions = [];
    @bindable unassignedPermissions = [];

    selectedAssignedPermissions = [];

    selectedUnassignedPermissions = [];

    movePermission(e, action) {
        console.log(action);

        if (action === "addAll") {
            for (var i = 0; i < this.unassignedPermissions.length; i++) {
                this.assignedPermissions.push(this.unassignedPermissions[i]);
            }

            for (var i = 0; i < this.assignedPermissions.length; i++) {
                let itemToRemove = this.unassignedPermissions.indexOf(this.assignedPermissions[i]);
                this.unassignedPermissions.splice(itemToRemove, 1);
            }
        }

        if (action === "removeAll") {
            for (var i = 0; i < this.assignedPermissions.length; i++) {
                this.unassignedPermissions.push(this.assignedPermissions[i]);
            }

            for (var i = 0; i < this.unassignedPermissions.length; i++) {
                let itemToRemove = this.assignedPermissions.indexOf(this.unassignedPermissions[i]);
                this.assignedPermissions.splice(itemToRemove, 1);
            }
        }

        if (action === "remove") {
            for (var i = 0; i < this.selectedAssignedPermissions.length; i++) {
                let itemToRemove = this.assignedPermissions.indexOf(this.selectedAssignedPermissions[i]);
                this.unassignedPermissions.push(this.assignedPermissions[itemToRemove]);
                this.assignedPermissions.splice(itemToRemove, 1);
            }
        }

        if (action === "add") {
            for (var i = 0; i < this.selectedUnassignedPermissions.length; i++) {
                let itemToRemove = this.unassignedPermissions.indexOf(this.selectedUnassignedPermissions[i]);
                this.assignedPermissions.push(this.unassignedPermissions[itemToRemove]);
                this.unassignedPermissions.splice(itemToRemove, 1);
            }
        }

        this.sortPermissions(this.assignedPermissions);
        this.sortPermissions(this.unassignedPermissions);
    }

    attached() {
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
}



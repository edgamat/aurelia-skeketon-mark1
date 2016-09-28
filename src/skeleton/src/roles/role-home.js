
export class RoleHome {
    heading = 'Role Manager';

    selectedRoleId = 1;

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

import {RoleHome} from '../../src/roles/role-home';

describe('the RoleHome module', () => {

  var sut;
  var mockedRouter;

  beforeEach(() => {
    sut = new RoleHome();
  });

  it('should have a default selected role', () => {
    expect(sut.selectedRoleId).toEqual(1);
  });

  it('sort permissions should work', () => {

    let assignedPermissions = 
    [
        { permissionId: 1, permissionName: "BRAVO" },
        { permissionId: 2, permissionName: "ALPHA" }
    ]

    sut.sortPermissions(assignedPermissions);

    expect(assignedPermissions[0].permissionName).toEqual("ALPHA");
  });

  it('should throw exception when passing null permissions', () => {

    let assignedPermissions = null;

    expect(function() { 
        sut.sortPermissions(assignedPermissions); 
    }).toThrow(new Error("Invalid Input"));
  });

});

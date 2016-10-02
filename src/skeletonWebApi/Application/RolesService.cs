using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using skeletonEF6;

namespace skeletonWebApi.Application
{
    public class RolesService
    {
        public RolesService(AuthContext context)
        {
            this.AuthContext = context;
        }

        public AuthContext AuthContext { get; private set; }

        public void UpdateDbObject(Role role, Role existing)
        {
            var assignedPermissions = role.Permissions;

            if (assignedPermissions != null)
            {
                // Get a list of all the permissions the user has assigned to the role
                var assignedIds = assignedPermissions.Select(x => Convert.ToInt32(x.PermissionId));

                // Get a list of all the permissions existing in the database for the role
                var existingPermissions = existing.Permissions;

                // Get a list of all the permissions in both lists (the ones we want to keep)
                var permissionsToKeep =
                    from e in existingPermissions
                    join a in assignedIds on e.PermissionId equals a
                    select e;

                // Get a list of all the assigned permissions not already in the database (ones we want to add)
                var permissionIdsToAdd = assignedIds.Except(permissionsToKeep.Select(x => x.PermissionId));

                var permissionsToAdd = this.AuthContext.Permissions.Where(x => permissionIdsToAdd.Contains(x.PermissionId));
                foreach (var permissionToAdd in permissionsToAdd)
                {
                    existing.Permissions.Add(permissionToAdd);
                }

                // Get a list of all the permissions in the database we aren't keeping (ones we want to remove)
                var permissionsToRemove = existingPermissions.Except(permissionsToKeep);

                foreach (var permissionToRemove in permissionsToRemove)
                {
                    existing.Permissions.Remove(permissionToRemove);
                }
            }
            else
            {
                // Remove all permissions
                foreach (var item in existing.Permissions)
                {
                    existing.Permissions.Remove(item);
                }
            }
        }
    }
}

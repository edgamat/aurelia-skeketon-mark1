using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace skeletonEF6
{
    public class AuthContextInitializer : DropCreateDatabaseIfModelChanges<AuthContext>
    {
        protected override void Seed(AuthContext context)
        {
            var roles = new List<Role>
            {
                new Role { RoleId = 1, RoleName = "Admin" },
                new Role { RoleId = 2, RoleName = "Manager" },
                new Role { RoleId = 3, RoleName = "Analyst" },
            };

            context.Roles.AddRange(roles);

            context.SaveChanges();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using skeletonEF6;
using skeletonWebApi.Application;

namespace skeletonWebApi.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        public RolesController(AuthContext authContext)
        {
            this.AuthContext = authContext;
        }

        public AuthContext AuthContext { get; private set; }

        [HttpGet]
        public IEnumerable<Role> Get()
        {
            this.AuthContext.Configuration.AutoDetectChangesEnabled = false;
            this.AuthContext.Configuration.ProxyCreationEnabled = false;
            var roles = this.AuthContext.Roles.AsNoTracking().ToList();

            System.Threading.Thread.Sleep(1000);

            return roles;
        }

        [HttpGet("{id}", Name = "GetRole")]
        public IActionResult GetById(int id)
        {
            this.AuthContext.Configuration.AutoDetectChangesEnabled = false;
            this.AuthContext.Configuration.ProxyCreationEnabled = false;

            var query = this.AuthContext.Roles
                .AsNoTracking()
                .Where(x => x.RoleId == id);

            var role = query.FirstOrDefault();
            if (role == null)
            {
                return NotFound();
            }

            var assignedPermissions = this.AuthContext.Permissions
                .AsNoTracking()
                .Where(x => x.Roles.Any(y => y.RoleId == id))
                .ToList();

            var assignedIds = assignedPermissions.Select(x => x.PermissionId).ToArray();

            var unassignedPermissions = this.AuthContext.Permissions
                .AsNoTracking()
                .Where(x => !assignedIds.Contains(x.PermissionId))
                .ToList();

            var result = new
            {
                role,
                assignedPermissions,
                unassignedPermissions
            };

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Role role)
        {
            if (role == null)
            {
                return BadRequest();
            }

            var permissions = role.Permissions;

            role.Permissions = new List<Permission>();

            role.RoleId = 0;

            this.AuthContext.Roles.Add(role);

            if (permissions != null)
            {
                foreach (var permissionToAdd in permissions)
                {
                    var permission = this.AuthContext.Permissions.FirstOrDefault(x => x.PermissionId == permissionToAdd.PermissionId);
                    if (permission != null)
                    {
                        role.Permissions.Add(permission);
                    }
                }
            }

            this.AuthContext.SaveChanges();

            return CreatedAtRoute("GetRole", new { id = role.RoleId }, role);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Role data)
        {
            if (data == null || data.RoleId != id)
            {
                return BadRequest();
            }

            var role = this.AuthContext.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            var service = new RolesService(this.AuthContext);

            service.UpdateDbObject(data, role);

            this.AuthContext.SaveChanges();

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var role = this.AuthContext.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            this.AuthContext.Roles.Remove(role);

            this.AuthContext.SaveChanges();

            return new NoContentResult();
        }
    }
}

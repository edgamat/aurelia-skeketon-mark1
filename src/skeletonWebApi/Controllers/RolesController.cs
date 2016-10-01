using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using skeletonEF6;

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
            var roles = this.AuthContext.Roles.ToList();

            return roles;
        }
    }
}

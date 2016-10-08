using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using skeletonEF6;
using skeletonWebApi.Application;

namespace skeletonWebApi.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpGet]
        [Route("UserRecords")]
        public IEnumerable<IdentityUser> Get()
        {
            var users = this.GetUsers();

            return users;
        }

        [HttpGet]
        [Route("UserRecordsForPagination")]
        public IActionResult GetUserRecordsForPagination(int startIdx, int endIdx)
        {
            var users = this.GetUsers();

            var recordCount = users.Count();
            var page = users.Skip(startIdx - 1).Take(endIdx - startIdx + 1).ToList();

            var result = new
            {
                RecordCount = recordCount,
                Users = page
            };

            return Ok(result);
        }

        public IEnumerable<IdentityUser> GetUsers()
        {
            var users = new List<IdentityUser>();

            for (int i = 0; i < 100; i++)
            {
                var user = new IdentityUser
                {
                    Email = $"test-{i}@example.com",
                    UserName = $"test{i}",
                    Id = i.ToString(),
                    PhoneNumber = $"850555{i:0000}"
                };

                users.Add(user);
            }

            return users;
        }
    }
}

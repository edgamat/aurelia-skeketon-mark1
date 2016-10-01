using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace skeletonEF6
{
    public class Role
    {
        [Key]
        [Required]
        public int RoleId { get; set; }

        [Required]
        [StringLength(200)]
        public string RoleName { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }
    }
}

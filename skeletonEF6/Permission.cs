using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace skeletonEF6
{
    public class Permission
    {
        [Key]
        [Required]
        public int PermissionId { get; set; }

        [Required]
        [StringLength(200)]
        public string PermissionName { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
    }
}

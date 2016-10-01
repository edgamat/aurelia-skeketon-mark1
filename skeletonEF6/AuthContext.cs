using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace skeletonEF6
{
    public class AuthContext : DbContext
    {
        public AuthContext()
        {
        }

        public AuthContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {
        }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasMany(p => p.Permissions)
                .WithMany(t => t.Roles)
                .Map(mc =>
                {
                    mc.ToTable("RolePermission");
                    mc.MapLeftKey("RoleId");
                    mc.MapRightKey("PermissionId");
                });

            base.OnModelCreating(modelBuilder);
        }
    }
}

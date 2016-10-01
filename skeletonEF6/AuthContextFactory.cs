using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace skeletonEF6
{
    public class AuthContextFactory : IDbContextFactory<AuthContext>
    {
        public AuthContext Create()
        {
            return new AuthContext(@"Server=(localdb)\\v11.0;Database=SkeletonAuthContext1;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}

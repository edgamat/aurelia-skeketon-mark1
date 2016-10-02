using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;

namespace SkeletonIdentityServer
{
    public class Config
    {
        public static IEnumerable<Scope> GetScopes()
        {
            return new List<Scope>
            {
                new Scope
                {
                    Name = "api1",
                    Description = "My API"
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "chrysalis",
                    ClientName = "Chrysalis Client",
                    AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,

                    RequireConsent = false,

                    ClientSecrets = new List<Secret>
                    {
                        new Secret("secret".Sha256())
                    },

                    RedirectUris = new List<string>
                    {
                        "http://localhost:52000",
                        "http://localhost:52001"
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:52000",
                        "http://localhost:52001"
                    },

                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:52000",
                        "http://localhost:52001"
                    },

                    AllowedScopes = new List<string>
                    {
                        StandardScopes.OpenId.Name,
                        StandardScopes.Profile.Name,
                        StandardScopes.OfflineAccess.Name,
                        "api1"
                    }
                }
            };
        }
    }
}

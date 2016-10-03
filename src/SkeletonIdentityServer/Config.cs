﻿using System;
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
            var scopes = new List<Scope>
            {
                StandardScopes.OpenId,

                StandardScopes.ProfileAlwaysInclude,

                StandardScopes.EmailAlwaysInclude,

                StandardScopes.OfflineAccess,

                StandardScopes.RolesAlwaysInclude,

                new Scope
                {
                    Enabled = true,
                    Name = "apiAccess",
                    Description = "API Access",
                    Type = ScopeType.Resource,
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim(StandardScopes.Email.Name),
                    },
                }
            };

            scopes.AddRange(StandardScopes.All);

            return scopes;
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "chrysalis",
                    ClientName = "Chrysalis Client",
                    ClientUri = "http://localhost:52000",
                    AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                    RequireConsent = false,
                    AllowAccessToAllScopes=false,
                    AllowRememberConsent = true,

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
                        StandardScopes.Email.Name,
                        StandardScopes.OfflineAccess.Name,
                        "apiAccess"
                    }
                }
            };
        }
    }
}

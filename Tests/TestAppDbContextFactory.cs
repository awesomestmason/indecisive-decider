using IdentityServer4.EntityFramework.Options;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Interfaces;
using indecisive_decider.Services;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public static class TestAppDbContextFactory
    {

        public static async Task<ApplicationUser> AddRandomUserAsync(this AppDbContext context)
        {
            IRepository<ApplicationUser> userRepo = new EfRepository<ApplicationUser>(context);
            return await userRepo.AddAsync(new ApplicationUser()
            {
                UserName = $"User#{Guid.NewGuid()}",
            });
        }
        public static async Task<Preset> AddRandomPresetAsync(this AppDbContext context, ApplicationUser owner = null)
        {
            IRepository<Preset> presetRepo = new EfRepository<Preset>(context);
            return await presetRepo.AddAsync(new Preset()
            {
                Name = $"Preset#{Guid.NewGuid()}",
                Items = new List<PresetItem>(),
                Owner = owner
            });
        }

        public static AppDbContext CreateInMemory()
        {
            var dbOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: $"testDb{Guid.NewGuid()}")
                .Options;
            OperationalStoreOptions storeOptions = new OperationalStoreOptions
            {
            };
            IOptions<OperationalStoreOptions> operationalStoreOptions = Options.Create(storeOptions);

            var ctx = new AppDbContext(dbOptions, operationalStoreOptions);
            ctx.Database.EnsureDeleted();
            ctx.Database.EnsureCreated();
            return ctx;
        }
        public static AppDbContext CreateSqlInMemory()
        {
            var dbOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(CreateInMemoryDatabase())
                .Options;
                        OperationalStoreOptions storeOptions = new OperationalStoreOptions
                        {
                        };
                        IOptions<OperationalStoreOptions> operationalStoreOptions = Options.Create(storeOptions);

            var ctx = new AppDbContext(dbOptions, operationalStoreOptions);
            ctx.Database.EnsureDeleted();
            ctx.Database.EnsureCreated();
            return ctx;
        }
        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();
            return connection;
        }

    }
}

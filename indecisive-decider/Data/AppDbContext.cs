using IdentityServer4.EntityFramework.Options;
using indecisive_decider.Entities;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace indecisive_decider.Data
{
    public class AppDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public AppDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<PresetItem> PresetItems { get; set; }
        public DbSet<Preset> Presets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PresetItem>().Property(preset => preset.Id).ValueGeneratedOnAdd();
            builder.Entity<Preset>().Property(preset => preset.Id).ValueGeneratedOnAdd();

            builder.Entity<PresetItem>()
                .HasOne(item => item.Preset)
                .WithMany(preset => preset.Items)
                .HasForeignKey(item => item.PresetId)
                .HasPrincipalKey(item => item.Id);


        }
    }
}
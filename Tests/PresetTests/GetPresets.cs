using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.PresetTests
{
    public class GetPresets
    {
        /// <summary>
        /// Tests that custom presets are fetched correctly
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Get_custom_presets()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var presetRepository = new EfRepository<Preset>(context);

                var selfUser = await context.AddRandomUserAsync();

                await context.Presets.AddAsync(new Preset()
                {
                    Name = "Test",
                    Owner = selfUser,
                    Items = new List<PresetItem>()
                    {
                        new PresetItem("One"), new PresetItem("Two"), new PresetItem("Three")
                    }
                });
                await context.SaveChangesAsync();

                var presetService = new PresetService(context, presetRepository);
                var customPresets = await presetService.GetUserPresetsAsync(selfUser.Id);
                Assert.NotEmpty(customPresets);
                Assert.Equal("Test", customPresets[0].Name);
                Assert.Equal(selfUser.Id, customPresets[0].Owner.Id);
                Assert.Equal(3, customPresets[0].Items.Count);


            }
        }
    }
}

using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
namespace Tests.PresetTests
{
    public class UpdatePreset
    {
        /// <summary>
        /// Tests that preset name and items can be updated
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Preset_updates()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var presetRepository = new EfRepository<Preset>(context);
                //Create new user
                var selfUser = await context.AddRandomUserAsync();
                var preset = await presetRepository.AddAsync(new Preset()
                {
                    Name = "Test",
                    Owner = selfUser,
                    Items = new List<PresetItem>()
                    {
                        new PresetItem("One"), new PresetItem("Two"), new PresetItem("Three")
                    }
                });

                var presetService = new PresetService(presetRepository);
                //Test
                await presetService.UpdatePresetAsync(preset.Id, "Updated", new List<PresetItem>()
                    {
                        new PresetItem("Four")
                    });

                //Verify
                var presetInDb = await context.Presets
                    .Include(p => p.Owner)
                    .Include(p => p.Items)
                    .FirstOrDefaultAsync(p => p.Id == preset.Id);

                Assert.NotNull(presetInDb);
                Assert.Equal("Updated", presetInDb.Name);
                Assert.Equal(selfUser.Id, presetInDb.Owner.Id);
                Assert.Single(presetInDb.Items);
                Assert.Equal("Four", presetInDb.Items[0].Value);
            }
        }
        /// <summary>
        /// Tests that updating a preset to have 0 items works
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Preset_updates_to_empty()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var presetRepository = new EfRepository<Preset>(context);
                //Create new user
                var selfUser = await context.AddRandomUserAsync();
                var preset = await presetRepository.AddAsync(new Preset()
                {
                    Name = "Test",
                    Owner = selfUser,
                    Items = new List<PresetItem>()
                    {
                        new PresetItem("One"), new PresetItem("Two"), new PresetItem("Three")
                    }
                });

                var presetService = new PresetService(presetRepository);
                //Test
                await presetService.UpdatePresetAsync(preset.Id, "Updated", new List<PresetItem>());

                //Verify
                var presetInDb = await context.Presets
                    .Include(p => p.Owner)
                    .Include(p => p.Items)
                    .FirstOrDefaultAsync(p => p.Id == preset.Id);

                Assert.NotNull(presetInDb);
                Assert.Equal("Updated", presetInDb.Name);
                Assert.Equal(selfUser.Id, presetInDb.Owner.Id);
                Assert.Empty(presetInDb.Items);
            }
        }
        /// <summary>
        /// Tests that presets correctly update when some items overlap with the previous items
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Preset_updates_overlap()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var presetRepository = new EfRepository<Preset>(context);
                //Create new user
                var selfUser = await context.AddRandomUserAsync();
                var preset = await presetRepository.AddAsync(new Preset()
                {
                    Name = "Test",
                    Owner = selfUser,
                    Items = new List<PresetItem>()
                    {
                        new PresetItem("One"), new PresetItem("Two"), new PresetItem("Three")
                    }
                });

                var presetService = new PresetService(presetRepository);
                //Test
                await presetService.UpdatePresetAsync(preset.Id, "Updated", new List<PresetItem>()
                {
                    new PresetItem("One"), new PresetItem("Two"), new PresetItem("Extra")
                });

                //Verify
                var presetInDb = await context.Presets
                    .Include(p => p.Owner)
                    .Include(p => p.Items)
                    .FirstOrDefaultAsync(p => p.Id == preset.Id);

                Assert.NotNull(presetInDb);
                Assert.Equal("Updated", presetInDb.Name);
                Assert.Equal(selfUser.Id, presetInDb.Owner.Id);
                Assert.Equal(3, presetInDb.Items.Count);
                Assert.Equal("One", presetInDb.Items[0].Value);
                Assert.Equal("Two", presetInDb.Items[1].Value);
                Assert.Equal("Extra", presetInDb.Items[2].Value);

            }
        }
    }
}

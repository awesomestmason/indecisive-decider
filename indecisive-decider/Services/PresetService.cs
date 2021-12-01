using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using indecisive_decider.Interfaces;
using indecisive_decider.Specifications.Preset;

namespace indecisive_decider.Services
{
    public class PresetService : IPresetService
    {
        private readonly IRepository<Preset> _presetRepository;
        private static Preset numberPresetStatic = new Preset(){
            Name = "Numbers",
            Id = 0,
            Items = new List<PresetItem>(),
            Owner = null
        };
        public PresetService(IRepository<Preset> presetRepository)
        {
            _presetRepository = presetRepository;
        }
        public async Task<Preset> GetPreset(int id)
        {
            return await _presetRepository.GetBySpecAsync(new PresetByIdSpecification(id));
        }
        public async Task<List<Preset>> GetDefaultPresetsAsync()
        {
            return await _presetRepository.ListAsync(new DefaultPresetsSpecification());
        }
        public async Task<List<Preset>> GetUserPresetsAsync(string userId)
        {
            return await _presetRepository.ListAsync(new CustomPresetsSpecification(userId));

        }
        public async Task<List<Preset>> GetUserAndDefaultPresetsAsync(string userId)
        {
            return await _presetRepository.ListAsync(new CustomPresetsSpecification(userId, true));

        }

        public async Task RemovePresetAsync(int presetId)
        {
            var preset = await _presetRepository.GetByIdAsync(presetId);
            await _presetRepository.DeleteAsync(preset);
        }
        public async Task AddPresetAsync(Preset preset)
        {
            await _presetRepository.AddAsync(preset);
        }
        public async Task UpdatePresetAsync(int id, string name, IList<PresetItem> items) {
            var preset = await _presetRepository.GetByIdAsync(id);
            preset.Name = name;
            preset.Items = items;
            await _presetRepository.UpdateAsync(preset);
            //var old = await GetPreset(preset.Id);
            //var olditems = old.Items;
            //old.Name = preset.Name;
            //old.Items = preset.Items;
            //_context.PresetItems.RemoveRange(olditems);
            //await _context.SaveChangesAsync();
        }
        public async Task AddPresetsAsync(IEnumerable<Preset> preset)
        {
            foreach(var presetItem in preset)
            {
                await _presetRepository.AddAsync(presetItem);
            }
        }
        public async Task RemoveDefaults(){
            var defaults = await GetDefaultPresetsAsync();
            await _presetRepository.DeleteRangeAsync(defaults);
        }

    }
}
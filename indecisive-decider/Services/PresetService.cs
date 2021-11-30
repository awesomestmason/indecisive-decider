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
        private readonly AppDbContext _context;
        private readonly IRepository<Preset> _presetRepository;
        private static Preset numberPresetStatic = new Preset(){
            Name = "Numbers",
            Id = 0,
            Items = new List<PresetItem>(),
            Owner = null
        };
        public PresetService(AppDbContext context, IRepository<Preset> presetRepository)
        {
            _context = context;
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

        public async Task RemovePresetAsync(int presetId){
            var preset = await _presetRepository.GetByIdAsync(presetId);
            await _presetRepository.DeleteAsync(preset);
        }
        public async Task AddPresetAsync(Preset preset)
        {
            await _presetRepository.AddAsync(preset);
        }
        public async Task UpdatePresetAsync(Preset preset) {
            //await _presetRepository.UpdateAsync(preset);
            var old = await GetPreset(preset.Id);
            var olditems = old.Items;
            old.Name = preset.Name;
            old.Items = preset.Items;
            _context.PresetItems.RemoveRange(olditems);
            await _context.SaveChangesAsync();
        }
        public async Task AddPresetsAsync(IEnumerable<Preset> preset)
        {
            await _context.Presets.AddRangeAsync(preset);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveDefaults(){
            _context.Presets.RemoveRange(_context.Presets.Where(preset => preset.Owner == null));
            await _context.SaveChangesAsync();
        }

    }
}
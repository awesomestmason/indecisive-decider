using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;

namespace indecisive_decider.Services
{
    public class PresetService
    {
        private readonly AppDbContext _context;
        private static Preset numberPresetStatic = new Preset(){
            Name = "Numbers",
            Id = 0,
            Items = new List<PresetItem>(),
            Owner = null
        };
        public PresetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Preset> GetPreset(int id)
        {
            return await _context.Presets.Include(e => e.Owner).Include(e => e.Items).FirstOrDefaultAsync(preset => preset.Id == id);
        }

        public async Task<List<Preset>> GetDefaultPresetsAsync()
        {
            return await _context.Presets.Include(preset => preset.Items)
                .Where(preset => preset.Owner == null)
                .ToListAsync();
        }

        public async Task<List<Preset>> GetUserPresetsAsync(string userId)
        {
            return await _context.Presets.Include(preset => preset.Items)
                .Where(preset => preset.Owner.Id == userId)
                .ToListAsync();
        }
        public async Task<List<Preset>> GetUserAndDefaultPresetsAsync(string userId)
        {
            return await _context.Presets.Include(preset => preset.Items)
                .Where(preset => preset.Owner == null || preset.Owner.Id == userId)
                .ToListAsync();
        }


        public async Task RemovePresetAsync(int presetId){
            _context.Presets.Remove(_context.Presets.Where(preset => preset.Id == presetId).FirstOrDefault());
            await _context.SaveChangesAsync();
        }

        public async Task AddPresetAsync(Preset preset)
        {
            await _context.Presets.AddAsync(preset);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePresetAsync(Preset preset) {
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
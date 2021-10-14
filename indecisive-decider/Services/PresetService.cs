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

        public PresetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Preset> GetPreset(int id)
        {
            return await _context.Presets.FirstOrDefaultAsync(preset => preset.Id == id);
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


        public async Task AddPreset(Preset preset)
        {
            await _context.Presets.AddAsync(preset);
            await _context.SaveChangesAsync();
        }

    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;

namespace indecisive_decider.Interfaces
{
    public interface IPresetService
    {

        /// <summary>
        /// Gets a preset by Id
        /// </summary>
        /// <param name="id">Id of the preset</param>
        /// <returns>The preset</returns>
        Task<Preset> GetPreset(int id);
        /// <summary>
        /// Gets all the default presets
        /// </summary>
        /// <returns>List of all default presets</returns>
        Task<List<Preset>> GetDefaultPresetsAsync();
        /// <summary>
        /// Gets all the users custom presets
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <returns>List of custom user presets</returns>
        Task<List<Preset>> GetUserPresetsAsync(string userId);
        /// <summary>
        /// Gets users custom presets and default presets
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <returns>List of custom and default presets</returns>
        Task<List<Preset>> GetUserAndDefaultPresetsAsync(string userId);
        /// <summary>
        /// Deletes a custom user preset
        /// </summary>
        /// <param name="presetId">Id of preset</param>
        /// <returns></returns>
        Task RemovePresetAsync(int presetId);
        /// <summary>
        /// Adds a preset
        /// </summary>
        /// <param name="preset">The preset to add</param>
        /// <returns></returns>
        Task AddPresetAsync(Preset preset);
        /// <summary>
        /// Updates a preset
        /// </summary>
        /// <param name="preset">THe preset to update</param>
        /// <returns></returns>
        Task UpdatePresetAsync(int presetId, string name, IList<PresetItem> items);
        /// <summary>
        /// Adds multiple presets
        /// </summary>
        /// <param name="preset">Collection of presets to add</param>
        /// <returns></returns>
        Task AddPresetsAsync(IEnumerable<Preset> preset);
        /// <summary>
        /// Clears all default presets
        /// </summary>
        /// <returns></returns>
        Task RemoveDefaults();

    }
}
using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace indecisive_decider.Specifications.Preset
{
    public class CustomPresetsSpecification : Specification<Entities.Preset>
    {
        public CustomPresetsSpecification(string userId, bool includeDefaults = false)
        {
            Query
                .Include(preset => preset.Items)
                .Include(preset => preset.Owner)
                .Where(preset => preset.Owner.Id == userId || (includeDefaults && preset.Owner == null));
        }
    }
}

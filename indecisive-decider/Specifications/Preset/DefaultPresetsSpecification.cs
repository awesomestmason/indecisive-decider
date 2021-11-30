using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace indecisive_decider.Specifications.Preset
{
    public class DefaultPresetsSpecification : Specification<Entities.Preset>
    {
        public DefaultPresetsSpecification()
        {
            Query
                .Include(preset => preset.Items)
                .Where(preset => preset.Owner == null);
        }
    }
}

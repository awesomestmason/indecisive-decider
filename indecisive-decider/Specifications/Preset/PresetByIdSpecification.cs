using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace indecisive_decider.Specifications.Preset
{
    public class PresetByIdSpecification : Specification<Entities.Preset>, ISingleResultSpecification
    {
        public PresetByIdSpecification(int id)
        {
            Query
                .Where(preset => preset.Id == id)
                .Include(e => e.Owner)
                .Include(e => e.Items);
        }
    }
}

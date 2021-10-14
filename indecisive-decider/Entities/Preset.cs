using System.Collections;
using System.Collections.Generic;

namespace indecisive_decider.Entities
{
    public class Preset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<PresetItem> Items { get; set; }
        public ApplicationUser Owner { get; set; }
    }
}
using System.Collections;
using System.Collections.Generic;

namespace indecisive_decider.Entities
{
    public class Preset
    {
        public int Id { get; set; }
        public string Name { get; set; }  //Types of Bread
        public IList<PresetItem> Items { get; set; }  //"rye", "sourdough"...
        public ApplicationUser Owner { get; set; }
    }
}
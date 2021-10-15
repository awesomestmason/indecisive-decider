using System.Collections.Generic;

namespace indecisive_decider.Dtos
{
    public class PresetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PresetItemDto> Items { get; set; }
    }
}
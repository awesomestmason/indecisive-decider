using System.Collections.Generic;

namespace indecisive_decider.Dtos
{
    public class PresetWithIdDto
    {
        public int Id { get; set; }

        public bool IsDefault { get; set; }
        public string Name { get; set; }
        public List<PresetItemWithIdDto> Items { get; set; }
    }
    public class PresetDto
    {
        public string Name { get; set; }
        public List<PresetItemDto> Items { get; set; }
    }
}
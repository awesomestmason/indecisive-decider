namespace indecisive_decider.Entities
{
    public class PresetItem
    {
        public Preset Preset { get; set; }
        public int PresetId { get; set; }
        public int Id { get; set; }
        public string Value { get; set; }

        public PresetItem()
        {
        }

    }
}
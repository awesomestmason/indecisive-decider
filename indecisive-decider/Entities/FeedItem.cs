using System; 
using System.Collections.Generic;

namespace indecisive_decider.Entities
{
    public class FeedItem
    {
        public int Id { get; set; }

        public string UserId { get; set;}
        public ApplicationUser User { get; set; }  //Username

        public int PresetId {get; set;}
        public Preset Preset { get; set; }  //Preset Name/ID
        public string Result { get; set; }  //Result

        public DateTime Date { get; set; }

        public IList<FeedComment> Comments { get; set; }
    }
}

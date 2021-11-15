using System.Collections.Generic;
using System;
namespace indecisive_decider.Dtos
{
    public class FeedItemDto
    {
        public int Id { get; set; }
        public string Result {get; set; }
        public string PresetName { get; set; }
        public string Username { get; set; }
        public DateTime Date { get; set; }

        public List<FeedItemCommentDto> Comments { get; set; }
    }
}
using System;

namespace indecisive_decider.Dtos
{
    public class FeedItemCommentDto
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public UserDto User { get; set;}
        public DateTime CreatedAt { get; set; }
    }
}
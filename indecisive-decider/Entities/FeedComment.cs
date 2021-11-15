using System; 
namespace indecisive_decider.Entities
{
    public class FeedComment
    {
        public int Id { get; set; }
        public string UserId { get; set;}
        public ApplicationUser User { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public FeedItem FeedItem { get; set; }
        public int FeedItemId { get; set; }

    }
}

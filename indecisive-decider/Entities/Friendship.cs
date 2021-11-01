namespace indecisive_decider.Entities
{
    public class Friendship
    {

        public int Id { get; set; }

        public string FromUserId { get; set;}
        public ApplicationUser FromUser { get; set;}

        public string ToUserId { get; set;}
        public ApplicationUser ToUser { get; set;}

        public FriendshipStatus Status { get; set; }

    }

    public enum FriendshipStatus
    {
        Requested,
        Accepted,
        Declined
    }
}
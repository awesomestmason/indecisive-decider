using Ardalis.Specification;
using indecisive_decider.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace indecisive_decider.Specifications.Friendship
{
    public class UserFriendshipsSpecification : Specification<Entities.Friendship>
    {
        public UserFriendshipsSpecification(string userId, FriendshipStatus? status)
        {
            Query
                .Include(f => f.FromUser)
                .Include(f => f.ToUser)
                .Where(friendship => friendship.FromUserId == userId || friendship.ToUserId == userId)
                .Where(friendship => status == null || friendship.Status == status);
        }

    }
}

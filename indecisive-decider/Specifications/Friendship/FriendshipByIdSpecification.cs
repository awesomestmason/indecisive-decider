using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using indecisive_decider.Entities;

namespace indecisive_decider.Specifications.Friendship
{
    public class FriendshipByIdSpecification : Specification<Entities.Friendship>, ISingleResultSpecification
    {
        public FriendshipByIdSpecification(int friendshipId)
        {
            Query
                .Include(f => f.FromUser)
                .Include(f => f.ToUser);
        }
    }
}

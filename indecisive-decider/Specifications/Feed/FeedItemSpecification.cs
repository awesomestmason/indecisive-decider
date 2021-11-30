using Ardalis.Specification;
using indecisive_decider.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace indecisive_decider.Specifications.Feed
{
    public class FeedItemSpecification : Specification<FeedItem>
    {
        public FeedItemSpecification(string userId)
        {
            Query
                .Where(x => x.UserId == userId)
                .Include(x => x.Preset)
                .Include(x => x.Comments)
                .OrderByDescending(x => x.Date);
        }
        public FeedItemSpecification(string userId, int limit)
        {
            Query
                .Where(x => x.UserId == userId)
                .Include(x => x.Preset)
                .Include(x => x.Comments)
                .OrderByDescending(x => x.Date)
                .Take(limit);
        }
    }
}

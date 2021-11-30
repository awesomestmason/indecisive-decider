using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.FriendshipTests
{
    public class AddFriend
    {
        [Fact]
        public async Task Friend_request_show()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                var friendshipService = new FriendService(new EfRepository<Friendship>(context));

                await friendshipService.AddFriendshipRequestAsync(selfUser.Id, otherUser.Id);

                var otherRequests = await friendshipService.GetFriendshipsAsync(otherUser.Id, FriendshipStatus.Requested);

                Assert.NotEmpty(otherRequests);
                Assert.Single(otherRequests);


                Assert.Equal(otherUser.Id, otherRequests[0].ToUserId);
                Assert.Equal(selfUser.Id, otherRequests[0].FromUserId);
                Assert.Equal(FriendshipStatus.Requested, otherRequests[0].Status);

            }
        }

        [Fact]
        public async Task Friend_request_accept()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                var friendshipService = new FriendService(new EfRepository<Friendship>(context));

                var friendship = await friendshipService.AddFriendshipRequestAsync(selfUser.Id, otherUser.Id);
                await friendshipService.AcceptRequestAsync(friendship.Id);

                var friends = await friendshipService.GetFriendshipsAsync(selfUser.Id, FriendshipStatus.Accepted);

                Assert.NotEmpty(friends);
                Assert.Single(friends);


                Assert.Equal(otherUser.Id, friends[0].ToUserId);
                Assert.Equal(selfUser.Id, friends[0].FromUserId);
                Assert.Equal(FriendshipStatus.Accepted, friends[0].Status);

            }
        }

        [Fact]
        public async Task Friend_request_decline()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                var friendshipService = new FriendService(new EfRepository<Friendship>(context));

                var friendship = await friendshipService.AddFriendshipRequestAsync(selfUser.Id, otherUser.Id);
                await friendshipService.DeclineRequestAsync(friendship.Id);

                var friends = await friendshipService.GetFriendshipsAsync(selfUser.Id);

                Assert.Empty(friends);
            }
        }


    }
}

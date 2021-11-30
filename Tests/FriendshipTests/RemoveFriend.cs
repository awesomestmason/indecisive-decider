using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Tests.FriendshipTests
{
    public class RemoveFriend
    {
        [Fact]
        public async Task Friend_remove()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                var friendRepo = new EfRepository<Friendship>(context);
                var friendship = await friendRepo.AddAsync(new Friendship()
                {
                    FromUserId = selfUser.Id,
                    ToUserId = otherUser.Id,
                    Status = FriendshipStatus.Accepted
                });

                var friendshipService = new FriendService(friendRepo);

                await friendshipService.DeleteFriendshipAsync(friendship.Id);

                var friends = await friendshipService.GetFriendshipsAsync(selfUser.Id);
                var friendsOther = await friendshipService.GetFriendshipsAsync(otherUser.Id);

                Assert.Empty(friends);
                Assert.Empty(friendsOther);
            }
        }

        [Fact]
        public async Task Friend_remove_nonexisting()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                var friendRepo = new EfRepository<Friendship>(context);

                var friendshipService = new FriendService(friendRepo);
                await Assert.ThrowsAsync<ArgumentException>(async () =>
                {
                    await friendshipService.DeleteFriendshipAsync(1);
                });
            }
        }
    }
}

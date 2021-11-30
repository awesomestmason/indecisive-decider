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
        /// <summary>
        /// Test that friends can be removed
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Friend_remove()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                //Create two random users for testing
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();


                //Add a new friendship directly into the database
                var friendRepo = new EfRepository<Friendship>(context);
                var friendship = await friendRepo.AddAsync(new Friendship()
                {
                    FromUserId = selfUser.Id,
                    ToUserId = otherUser.Id,
                    Status = FriendshipStatus.Accepted
                });

                var friendshipService = new FriendService(friendRepo);

                //Test
                await friendshipService.DeleteFriendshipAsync(friendship.Id);

                //Verify
                var friends = await friendshipService.GetFriendshipsAsync(selfUser.Id);
                var friendsOther = await friendshipService.GetFriendshipsAsync(otherUser.Id);

                Assert.Empty(friends);
                Assert.Empty(friendsOther);
            }
        }
        /// <summary>
        /// Test that removing an invalid friendship results in an error
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Friend_remove_nonexisting()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                //Create the friendship repository
                var friendRepo = new EfRepository<Friendship>(context);

                //Create the service
                var friendshipService = new FriendService(friendRepo);

                //Verify that the exception gets thrown for invalid friendship id
                await Assert.ThrowsAsync<ArgumentException>(async () =>
                {
                    //Test
                    await friendshipService.DeleteFriendshipAsync(1);
                });
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Interfaces;
using indecisive_decider.Services;
using Moq;
using Xunit;
using Microsoft.EntityFrameworkCore;


namespace Tests.FeedTests
{

    public class AddToFeed
    {

        private Mock<IFriendService> _friendService;

        public AddToFeed()
        {
            //Set up fake friend service with no friendships
            _friendService = new Mock<IFriendService>();
            _friendService.Setup(s => s.GetFriendshipsAsync(It.IsAny<string>(), It.IsAny<FriendshipStatus>()).Result).Returns(new List<Friendship>());

        }


        [Fact]
        public async Task Share_decision_adds_to_feed()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var feedRepository = new EfRepository<FeedItem>(context);
                var commentRepository = new EfRepository<FeedComment>(context);
                var selfUser = await context.AddRandomUserAsync();
                var tempPreset = await context.AddRandomPresetAsync();

                IFeedService feedService = new FeedService(feedRepository, commentRepository, _friendService.Object);
                await feedService.ShareDecisionAsync(selfUser.Id, tempPreset.Id, "Test");
                var results = await context.FeedItems.ToListAsync();

                Assert.NotEmpty(results);
                Assert.Single(results);

                Assert.Equal("Test", results[0].Result);
                Assert.Equal(selfUser.Id, results[0].UserId);
                Assert.Equal(tempPreset.Id, results[0].PresetId);
                Assert.Empty(results[0].Comments);

            }
        }

        [Fact]
        public async Task Feed_shows_friend()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var feedRepository = new EfRepository<FeedItem>(context);
                var commentRepository = new EfRepository<FeedComment>(context);
                var friendRepository = new EfRepository<Friendship>(context);

                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                //Create friendship between self and other
                await friendRepository.AddAsync(new Friendship()
                {
                    FromUserId = selfUser.Id,
                    ToUserId = otherUser.Id,
                    Status = FriendshipStatus.Accepted
                });
                var tempPreset = await context.AddRandomPresetAsync();

                IFeedService feedService = new FeedService(feedRepository, commentRepository, new FriendService(friendRepository));

                //Share decision from other user
                await feedService.ShareDecisionAsync(otherUser.Id, tempPreset.Id, "Test");

                //Check feed from current user
                var results = await feedService.GetFeedItemsAsync(selfUser.Id, 10);


                Assert.NotEmpty(results);
                Assert.Single(results);

                Assert.Equal("Test", results[0].Result);
                Assert.Equal(otherUser.Id, results[0].UserId);
                Assert.Equal(tempPreset.Id, results[0].PresetId);
                Assert.Empty(results[0].Comments);

            }
        }

        [Fact]
        public async Task Feed_doesnt_show_nonfriend()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var feedRepository = new EfRepository<FeedItem>(context);
                var commentRepository = new EfRepository<FeedComment>(context);
                var selfUser = await context.AddRandomUserAsync();
                var otherUser = await context.AddRandomUserAsync();

                var tempPreset = await context.AddRandomPresetAsync();
                IFeedService feedService = new FeedService(feedRepository, commentRepository, _friendService.Object);

                //Share decision from other user
                await feedService.ShareDecisionAsync(otherUser.Id, tempPreset.Id, "Test");

                //Check feed from current user
                var results = await feedService.GetFeedItemsAsync(selfUser.Id, 10);
                Assert.Empty(results);
            }
        }
    }
}

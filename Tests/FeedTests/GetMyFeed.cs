using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using indecisive_decider.Interfaces;
using indecisive_decider.Services;
using Moq;
using Xunit;
namespace Tests.FeedTests
{
    public class GetMyFeed
    {
        private Mock<IFriendService> _friendService;

        public GetMyFeed(){
            //Set up fake friend service with no friendships
            _friendService = new Mock<IFriendService>();
            _friendService.Setup(s => s.GetFriendshipsAsync(It.IsAny<string>(), It.IsAny<FriendshipStatus>()).Result).Returns(new List<Friendship>());

        }

        [Fact]
        public async Task Empty_feed_returns_empty_list()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var feedRepository = new EfRepository<FeedItem>(context);
                var commentRepository = new EfRepository<FeedComment>(context);
                var selfUser = await context.AddRandomUserAsync();
                IFeedService feedService = new FeedService(feedRepository, commentRepository, _friendService.Object);
                var results = await feedService.GetFeedItemsAsync(selfUser.Id, 10);
                Assert.Empty(results);
            }

        }

        [Fact]
        public async Task Feed_shows_self()
        {
            using (var context = TestAppDbContextFactory.CreateInMemory())
            {
                var feedRepository = new EfRepository<FeedItem>(context);
                var commentRepository = new EfRepository<FeedComment>(context);
                var selfUser = await context.AddRandomUserAsync();
                var tempPreset = await context.AddRandomPresetAsync();
                await feedRepository.AddAsync(new FeedItem
                {
                    UserId = selfUser.Id,
                    Date = DateTime.Now,
                    PresetId = tempPreset.Id,
                    Result = "Test",
                    Comments = new List<FeedComment>()
                });
                IFeedService feedService = new FeedService(feedRepository, commentRepository, _friendService.Object);
                var results = await feedService.GetFeedItemsAsync(selfUser.Id, 10);
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

                await friendRepository.AddAsync(new Friendship()
                {
                    FromUserId = selfUser.Id,
                    ToUserId = otherUser.Id,
                    Status = FriendshipStatus.Accepted
                });

                var tempPreset = await context.AddRandomPresetAsync();
                await feedRepository.AddAsync(new FeedItem
                {
                    UserId = otherUser.Id,
                    Date = DateTime.Now,
                    PresetId = tempPreset.Id,
                    Result = "Test",
                    Comments = new List<FeedComment>()
                });
                IFeedService feedService = new FeedService(feedRepository, commentRepository, new FriendService(friendRepository));
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
                await feedRepository.AddAsync(new FeedItem
                {
                    UserId = otherUser.Id,
                    Date = DateTime.Now,
                    PresetId = tempPreset.Id,
                    Result = "Test",
                    Comments = new List<FeedComment>()
                });
                IFeedService feedService = new FeedService(feedRepository, commentRepository, _friendService.Object);
                var results = await feedService.GetFeedItemsAsync(selfUser.Id, 10);
                Assert.Empty(results);
            }
        }
    }
}

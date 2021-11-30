using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using indecisive_decider.Interfaces;
using indecisive_decider.Specifications.Feed;

namespace indecisive_decider.Services{
    public class FeedService : IFeedService
    {
        private readonly IFriendService _friendService;
        private readonly IRepository<FeedItem> _feedRepository;
        private readonly IRepository<FeedComment> _commentRepository;
        public FeedService(
            IRepository<FeedItem> feedRepository,
            IRepository<FeedComment> commentRepository,
            IFriendService friendService)
        {
            _friendService = friendService;
            _feedRepository = feedRepository;
            _commentRepository = commentRepository;
        }   
        public async Task ShareDecisionAsync(string userId, int presetId, string result)
        {
            var feedItem = new FeedItem(){
                PresetId = presetId,
                UserId = userId,
                Result = result,
                Date = DateTime.Now,
                Comments = new List<FeedComment>()
            };
            await _feedRepository.AddAsync(feedItem);
        }
        public async Task<List<FeedItem>> GetFeedItemsAsync(string userId, int limit = 10)
        {
            var friends = await _friendService.GetFriendshipsAsync(userId, FriendshipStatus.Accepted);
            List<FeedItem> feedItems = new List<FeedItem>();

            var myDecisions = await GetUserDecisionsAsync(userId, limit);
            feedItems.AddRange(myDecisions);

            foreach(var friendship in friends)
            {
                var friendId = friendship.FromUserId == userId ? friendship.ToUserId : friendship.FromUserId;
                var friendDecisions = await GetUserDecisionsAsync(friendId, limit);
                feedItems.AddRange(friendDecisions);
            }
            feedItems.Sort((x, y) => y.Date.CompareTo(x.Date));
            return feedItems.Take(limit).ToList();
        }
        public async Task<List<FeedItem>> GetUserDecisionsAsync(string userId, int limit = 10)
        {
            var results = await _feedRepository.ListAsync(new FeedItemSpecification(userId, limit));
            return results;
        }
        public async Task PostCommentAsync(string userId, int feedItemId, string comment)
        {
            var commentItem = new FeedComment(){
                FeedItemId = feedItemId,
                UserId = userId,
                Comment = comment,
                CreatedAt = DateTime.Now
            };
            await _commentRepository.AddAsync(commentItem);
        }
        public async Task<bool> DeleteCommentAsync(string userId, int commentId)
        {
            var comment = await _commentRepository.GetByIdAsync(commentId);
            if(comment == null || comment.UserId != userId)
            {
                return false;
            }
            await _commentRepository.DeleteAsync(comment);
            return true;
        }
    }
}


using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace indecisive_decider.Services{
    public class FeedService
    {
        private readonly AppDbContext _context;
        private readonly PresetService _presetService;
        private readonly FriendService _friendService;
        private readonly UserService _userService;
        public FeedService(AppDbContext context, PresetService presetService, FriendService friendService, UserService userService)
        {
            _context = context;
            _presetService = presetService;
            _friendService = friendService;
            _userService = userService;
        }   

        public async Task ShareDecisionAsync(string userId, int presetId, string result)
        {
            var preset = await _presetService.GetPreset(presetId);
            var feedItem = new FeedItem(){
                PresetId = presetId,
                UserId = userId,
                Result = result,
                Date = DateTime.Now
            };
            _context.FeedItems.Add(feedItem);
            _context.SaveChanges();
        }

        public async Task<List<FeedItem>> GetFeedItemsAsync(string userId, int limit = 10)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            var friends = await _friendService.GetFriendshipsAsync(user, FriendshipStatus.Accepted);
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
            var results = await _context.FeedItems
                .Include(x => x.Preset)
                .Where(x => x.UserId == userId).OrderByDescending(x => x.Date).Take(limit).ToListAsync();
            return results;
        }
    }
}


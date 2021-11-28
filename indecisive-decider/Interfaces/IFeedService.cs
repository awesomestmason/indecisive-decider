using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace indecisive_decider.Interfaces 
{
    public interface IFeedService
    {
        /// <summary>
        /// Adds a users decision to their public feed
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="presetId">Id of the preset used in the decision</param>
        /// <param name="result">The decision as a string</param>
        /// <returns></returns>
        Task ShareDecisionAsync(string userId, int presetId, string result);
        /// <summary>
        /// Gets a users feed that includes the decisions of the user and all the users friends.
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="limit">The maximum number of results to fetch</param>
        /// <returns></returns>
        Task<List<FeedItem>> GetFeedItemsAsync(string userId, int limit = 10);
        /// <summary>
        /// Gets the previous decisions of a user
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="limit">Maximum number of results to fetch</param>
        Task<List<FeedItem>> GetUserDecisionsAsync(string userId, int limit = 10);
        /// <summary>
        /// Adds a comment to a feed item
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="feedItemId">Id of the feed item</param>
        /// <param name="comment">Text of the comment</param>
        /// <returns></returns>
        Task PostCommentAsync(string userId, int feedItemId, string comment);
        /// <summary>
        /// Deletes a comment that the user posted
        /// </summary>
        /// <param name="userId">Id of the current user</param>
        /// <param name="commentId">Id of the comment to be deleted</param>
        /// <returns>True if the operation was successful</returns>
        Task<bool> DeleteCommentAsync(string userId, int commentId);
    }
}


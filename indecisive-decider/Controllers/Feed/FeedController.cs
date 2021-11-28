using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using indecisive_decider.Controllers.Account;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using indecisive_decider.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using indecisive_decider.Interfaces;

namespace indecisive_decider.Controllers.Feed
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private readonly IFeedService _feedService;
        private readonly IFriendService _friendService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public FeedController(IFeedService feedService, IFriendService friendService, IMapper mapper, IUserService userService)
        {
            _feedService = feedService;
            _friendService = friendService;
            _mapper = mapper;
            _userService = userService;
        }


        [Authorize]
        [HttpPost]
        [SwaggerOperation(
            Summary = "Shares the result of whatever the user got",
            Description = "Shares User result onto the feed",
            OperationId = "friends.share",
            Tags = new[] { "FeedEndpoints" })
        ]
        /// <summary>
        /// Allows the user to be able to share their decision to friends.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>OK</returns>
        public async Task<IActionResult> ShareDecision(ShareDecisionRequest request)
        {
            var user = await _userService.VerifyUser(User);
            if(user == null)
            {
                return BadRequest("Invalid user");
            }
            await _feedService.ShareDecisionAsync(user.Id, request.PresetId, request.Result);
            return Ok();
        }

        
        [Authorize]
        [HttpGet]
        [SwaggerOperation(
            Summary = "Takes the feed and shows the Feed results",
            Description = "Gets the Feed results from friends",
            OperationId = "friends.show",
            Tags = new[] { "FeedEndpoints" })
        ]
        /// <summary>
        /// Returns the feeditems of the logged in User
        /// </summary>
        /// <returns>OK of the selected feeditem</returns>
        public async Task<ActionResult<IEnumerable<FeedItemDto>>> GetFeedItems()
        {
            var user = await _userService.VerifyUser(User);
            if(user == null)
            {
                return BadRequest("Invalid user");
            }
            var feedItems = await _feedService.GetFeedItemsAsync(user.Id, limit: 10);
            return Ok(feedItems.Select(x => _mapper.Map<FeedItemDto>(x)));
        }
        [Authorize]
        [HttpPost("{feedItemId}")]
        [SwaggerOperation(
            Summary = "Posts a comment on a feed item",
            Description = "Posts a comment on a feed item",
            OperationId = "friends.comment",
            Tags = new[] { "FeedEndpoints" })
        ]
        /// <summary>
        /// Allows the user to post a comment to a feed item.
        /// </summary>
        /// <param name="feedItemId"></param>
        /// <param name="request"></param>
        /// <returns>OK</returns>
        public async Task<ActionResult> PostComment(int feedItemId, PostCommentRequest request)
        {
            var user = await _userService.VerifyUser(User);
            if(user == null)
            {
                return BadRequest("Invalid user");
            }
            await _feedService.PostCommentAsync(user.Id, feedItemId, request.Comment);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{commentId}")]
        [SwaggerOperation(
            Summary = "Deletes a comment on a feed item",
            Description = "Deletes a comment on a feed item",
            OperationId = "friends.commentDelete",
            Tags = new[] { "FeedEndpoints" })
        ]
        /// <summary>
        /// Deletes any unwanted comments on a feed item.
        /// </summary>
        /// <param name="commentId"></param>
        /// <returns>BadRequest or OK</returns>
        public async Task<ActionResult> DeleteComment(int commentId)
        {
            var user = await _userService.VerifyUser(User);
            if(user == null)
            {
                return BadRequest("Invalid user");
            }
            var result = await _feedService.DeleteCommentAsync(user.Id, commentId);
            if(!result){
                return BadRequest("Error: No permission or No comment");
            }
            return Ok();
        }

    }
}

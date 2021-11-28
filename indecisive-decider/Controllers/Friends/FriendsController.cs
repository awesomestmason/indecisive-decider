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

namespace indecisive_decider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFriendService _friendService;
        private readonly IUserService _userService;
        public FriendsController(
            IMapper mapper,
            IUserService userService,
            IFriendService friendService)
        {
            _friendService = friendService;
            _mapper = mapper;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("requests")]
        [SwaggerOperation(
            Summary = "Gets all friend requests to the user",
            Description = "Gets all friend requests to the user",
            OperationId = "friends.requests",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Allows the user to see all friend request sent to them.
        /// </summary>
        /// <returns>Path to who made the friend request</returns>
        public async Task<ActionResult<IEnumerable<FriendshipDto>>> GetFriendRequests()
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var results = await _friendService.GetFriendshipsAsync(user, FriendshipStatus.Requested);
            return Ok(results.Where(f => f.ToUserId == user.Id).Select(f => new FriendshipDto(){
                Id = f.Id,
                User = _mapper.Map<UserDto>(f.FromUser == user ? f.ToUser : f.FromUser),
            }));
        }

        //Search for friends by username/email throughout the database
        [Authorize]
        [HttpGet("search/{query}")]
        [SwaggerOperation(
            Summary = "Searches for a friend by username/email",
            Description = "Searches for a friend by username/email",
            OperationId = "friends.search",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Let user be able to search for a friend within the query.
        /// </summary>
        /// <param name="query"></param>
        /// <returns>The location of the searched friend ID</returns>
        public async Task<ActionResult<IEnumerable<UserDto>>> FriendSearch(string query)
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var results = await _userService.GetUsersByNameOrEmailAsync(query);
            return Ok(_mapper.Map<IEnumerable<UserDto>>(results.Where(u => u.Id != user.Id)));
        }

        //Send a friend request to a user
        [Authorize]
        [HttpGet("request/{userId}")]
        [SwaggerOperation(
            Summary = "Requests a friend by user id",
            Description = "Requests a friend by user id",
            OperationId = "friends.request",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Enables user to be able to request another user to be their friend.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Badrequest or OK</returns>
        public async Task<ActionResult> RequestFriend(string userId){
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            if(user.Id == userId){
                return BadRequest("Cannot request yourself");
            }
            var currentFriends = await _friendService.GetFriendshipsAsync(user);
            if(currentFriends.Any(f => f.FromUserId == userId || f.ToUserId == userId))
            {
                return BadRequest("User is already a friend or you have already sent a request to that user");
            }
            //calls badrequest even when they are not officially friends
            var friend = await _userService.GetUserByIdAsync(userId);
            await _friendService.AddFriendshipRequestAsync(user, friend);
            return Ok();
        }
        
        //declining a friend request by saying no, parameter is the id of the friend request
        [Authorize]
        [HttpGet("request/{friendRequestId:int}/decline")]
        [SwaggerOperation(
            Summary = "Declines a friend request",
            Description = "Declines a friend request",
            OperationId = "friends.decline",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Allows user to decline a friend request
        /// </summary>
        /// <param name="friendRequestId"></param>
        /// <returns>bad request or OK</returns>
        public async Task<ActionResult> DeclineFriend(int friendRequestId){
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            try{
                await _friendService.DeclineRequestAsync(friendRequestId);
            }catch(ArgumentException e){
                return BadRequest(e.Message);
            }
            return Ok();
        }

        //accepting a friend request by saying yes, parameter is the id of the friend request
        [Authorize]
        [HttpGet("request/{friendRequestId:int}/accept")]
        [SwaggerOperation(
            Summary = "Accepts a friend request",
            Description = "Accepts a friend request",
            OperationId = "friends.accept",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Allows user to accept a friend request
        /// </summary>
        /// <param name="friendRequestId"></param>
        /// <returns>Bad request or OK</returns>
        public async Task<ActionResult> AcceptFriend(int friendRequestId)
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            try{
                await _friendService.AcceptRequestAsync(friendRequestId);
            }catch(ArgumentException e){
                return BadRequest(e.Message);
            }
            return Ok();
        }
        
        //Getting the list of friends that the user has
        [Authorize]
        [HttpGet()]
        [SwaggerOperation(
            Summary = "Gets all the users friends",
            Description = "Gets all the users friends",
            OperationId = "friends.get",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Gets all connected friends to user.
        /// </summary>
        /// <returns>Location and value of all friends to user</returns>
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFriends()
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var results = await _friendService.GetFriendshipsAsync(user, FriendshipStatus.Accepted);
            return Ok(results.Select(f => new FriendshipDto(){
                Id = f.Id,
                User = _mapper.Map<UserDto>(f.FromUser == user ? f.ToUser : f.FromUser),
            }));
        }

        //Removes a friend
        [Authorize]
        [HttpDelete("{friendshipId:int}")]
        [SwaggerOperation(
            Summary = "Deletes a friend from friend list",
            Description = "Deletes a friend out of friend list",
            OperationId = "friends.delete",
            Tags = new[] { "FriendsEndpoints" })
        ]
        /// <summary>
        /// Deletes a Friend connected to user
        /// </summary>
        /// <param name="friendshipId"></param>
        /// <returns>Bad request or OK</returns>
        public async Task<ActionResult> DeleteFriend(int friendshipId)
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            Friendship friendship = await _friendService.GetFriendshipByIdAsync(friendshipId);
            if (friendship == null || (friendship.FromUserId != user.Id && friendship.ToUserId != user.Id))
            {
                return BadRequest("This is not your friend!");
            }
            await _friendService.DeleteFriendshipAsync(friendshipId);
            return Ok();
        } 
        

    }
}

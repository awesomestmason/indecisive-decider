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

namespace indecisive_decider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly FriendService _friendService;
        private readonly UserService _userService;
        public FriendsController(
            IMapper mapper,
            UserService userService,
            FriendService friendService)
        {
            _friendService = friendService;
            _mapper = mapper;
            _userService = userService;
        }

        //Gets all the 
        [Authorize]
        [HttpGet("requests")]
        [SwaggerOperation(
            Summary = "Gets all friend requests to the user",
            Description = "Gets all friend requests to the user",
            OperationId = "friends.requests",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult<IEnumerable<FriendshipDto>>> GetFriendRequests()
        {
            var user = await VerifyUser();
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
        public async Task<ActionResult<IEnumerable<UserDto>>> FriendSearch(string query)
        {
            var user = await VerifyUser();
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
        public async Task<ActionResult> RequestFriend(string userId){
            var user = await VerifyUser();
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
                return BadRequest("User is already a friend");
            }
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
        public async Task<ActionResult> DeclineFriend(int friendRequestId){
            var user = await VerifyUser();
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
        public async Task<ActionResult> AcceptFriend(int friendRequestId)
        {
            var user = await VerifyUser();
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
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFriends()
        {
            var user = await VerifyUser();
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
        public async Task<ActionResult> DeleteFriend(int friendshipId)
        {
            var user = await VerifyUser();
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


        private async Task<ApplicationUser> VerifyUser()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userService.GetUserByIdAsync(id);
            return user;
        }      
        

    }
}

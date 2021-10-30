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

namespace indecisive_decider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IMapper _mapper;
        public FriendsController(
            IMapper mapper)
        {
            _mapper = mapper;
        }

        //Search for friends by username/email throughout the database
        [HttpGet("search/{query}")]
        [SwaggerOperation(
            Summary = "Searches for a friend by username/email",
            Description = "Searches for a friend by username/email",
            OperationId = "friends.search",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult<IEnumerable<UserDto>>> FriendSearch(string query)
        {
            throw new NotImplementedException();
        }

        //Send a friend request to a user
        [HttpGet("request/{userId}")]
        [SwaggerOperation(
            Summary = "Requests a friend by user id",
            Description = "Requests a friend by user id",
            OperationId = "friends.request",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult> RequestFriend(string userId){
            throw new NotImplementedException();
        }
        
        //declining a friend request by saying no
        [HttpGet("request/{friendRequestId}/decline")]
        [SwaggerOperation(
            Summary = "Declines a friend request",
            Description = "Declines a friend request",
            OperationId = "friends.decline",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult> DeclineFriend(string friendRequestId){
            throw new NotImplementedException();
        }

        //accepting a friend request by saying yes, parameter is the friend requesting
        [HttpGet("request/{friendRequestId}/accept")]
        [SwaggerOperation(
            Summary = "Accepts a friend request",
            Description = "Accepts a friend request",
            OperationId = "friends.accept",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult> AcceptFriend(string friendRequestId)
        {
            throw new NotImplementedException();
        }
        
        //Getting the list of friends that the user has already
        [HttpGet()]
        [SwaggerOperation(
            Summary = "Gets all the users friends",
            Description = "Gets all the users friends",
            OperationId = "friends.get",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFriends()
        {
            throw new NotImplementedException();
        }

        //Removes a friend
        [HttpDelete("{friendId}")]
        [SwaggerOperation(
            Summary = "Deletes a friend from friend list",
            Description = "Deletes a friend out of friend list",
            OperationId = "friends.delete",
            Tags = new[] { "FriendsEndpoints" })
        ]
        public async Task<ActionResult> DeleteFriend(string friendId)
        {
            throw new NotImplementedException();
        }
        

    }
}

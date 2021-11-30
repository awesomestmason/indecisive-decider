using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using indecisive_decider.Interfaces;
using indecisive_decider.Specifications.Friendship;

namespace indecisive_decider.Services
{
    public class FriendService : IFriendService
    {
        private readonly IRepository<Friendship> _friendshipRepository;

        public FriendService(IRepository<Friendship> friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }
        public async Task<Friendship> AddFriendshipRequestAsync(string fromUserId, string toUserId)
        {
            return await _friendshipRepository.AddAsync(new Friendship()
            {
                FromUserId = fromUserId,
                ToUserId = toUserId,
                Status = FriendshipStatus.Requested
            });
        }
        public async Task<List<Friendship>> GetFriendshipsAsync(string userId, FriendshipStatus? status = null)
        {
            return await _friendshipRepository.ListAsync(new UserFriendshipsSpecification(userId, status));
        }
        public async Task DeclineRequestAsync(int id){
            var friendship = await _friendshipRepository.GetByIdAsync(id);
            if(friendship.Status != FriendshipStatus.Requested){
                return;
            }
            if(friendship == null)
            {
                throw new ArgumentException("Invalid id");
            }
            await DeleteFriendshipAsync(id);
        }
        public async Task AcceptRequestAsync(int id)
        {
            var friendship = await _friendshipRepository.GetByIdAsync(id);
            //Check to make sure friendship is not null!
            if (friendship == null)
            {
                throw new ArgumentException("Invalid id");
            }
            if(friendship.Status != FriendshipStatus.Requested){
                return;
            }
            friendship.Status = FriendshipStatus.Accepted;
            await _friendshipRepository.UpdateAsync(friendship);
        }
        public async Task DeleteFriendshipAsync(int id)
        {
            var friendship = await _friendshipRepository.GetByIdAsync(id);
            if(friendship == null)
            {
                throw new ArgumentException(nameof(id));
            }
            await _friendshipRepository.DeleteAsync(friendship);
        }
        public async Task<Friendship> GetFriendshipByIdAsync(int id){
            var friendship = await _friendshipRepository.GetBySpecAsync(new FriendshipByIdSpecification(id));
            return friendship;
        }

    }
}
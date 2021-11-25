using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace indecisive_decider.Services
{
    public class FriendService
    {
        private readonly AppDbContext _context;

        public FriendService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddFriendshipRequestAsync(ApplicationUser from, ApplicationUser to)
        {
            await _context.Friendships.AddAsync(new Friendship()
            {
                FromUser = from,
                ToUser = to,
                Status = FriendshipStatus.Requested
            });
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Friendship>> GetFriendshipsAsync(ApplicationUser user, FriendshipStatus? status = null)
        {
            return await _context.Friendships
                .Include(f => f.FromUser)
                .Include(f => f.ToUser)
                .Where(friendship => friendship.FromUserId == user.Id || friendship.ToUserId == user.Id)
                .Where(friendship => status == null || friendship.Status == status)
                .ToListAsync();
        }

        public async Task DeclineRequestAsync(int id){
            var friendship = await _context.Friendships.FindAsync(id);
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
            var friendship = await _context.Friendships.FindAsync(id);
            //Check to make sure friendship is not null!
            if(friendship == null)
            {
                throw new ArgumentException("Invalid id");
            }
            if(friendship.Status != FriendshipStatus.Requested){
                return;
            }
            friendship.Status = FriendshipStatus.Accepted;
            _context.Friendships.Update(friendship);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFriendshipAsync(int id)
        {
            var friendship = await _context.Friendships.FindAsync(id);
            _context.Friendships.Remove(friendship);
            await _context.SaveChangesAsync();
        }

        public async Task<Friendship> GetFriendshipByIdAsync(int id){
            var friendship = await _context.Friendships
                .Include(f => f.FromUser)
                .Include(f => f.ToUser)
                .FirstOrDefaultAsync(f => f.Id == id);
            return friendship;
        }

    }
}
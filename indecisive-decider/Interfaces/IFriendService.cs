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
    public interface IFriendService
    {

        /// <summary>
        /// Creates a friendship request from a user to a user
        /// </summary>
        /// <param name="from">The requesting user</param>
        /// <param name="to">The target user</param>
        /// <returns></returns>
        Task AddFriendshipRequestAsync(ApplicationUser from, ApplicationUser to);

        /// <summary>
        /// Gets all the users friendships
        /// </summary>
        /// <param name="user">The user</param>
        /// <param name="status">Filter by the status of the friendship</param>
        /// <returns></returns>
        Task<IEnumerable<Friendship>> GetFriendshipsAsync(ApplicationUser user, FriendshipStatus? status = null);

        /// <summary>
        /// Declines a friendship request
        /// </summary>
        /// <param name="id">Id of the friendship request</param>
        /// <returns></returns>
        Task DeclineRequestAsync(int id);

        /// <summary>
        /// Accepts a friendship request
        /// </summary>
        /// <param name="id">Id of the friendship request</param>
        /// <returns></returns>
        Task AcceptRequestAsync(int id);

        /// <summary>
        /// Removes a friendship
        /// </summary>
        /// <param name="id">Id of the friendship</param>
        /// <returns></returns>
        Task DeleteFriendshipAsync(int id);
        /// <summary>
        /// Gets a friendship by id
        /// </summary>
        /// <param name="id">Id of the friendship</param>
        /// <returns>The friendship object</returns>
        Task<Friendship> GetFriendshipByIdAsync(int id);

    }
}
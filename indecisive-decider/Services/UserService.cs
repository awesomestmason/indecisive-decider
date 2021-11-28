using System.Collections.Generic;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using indecisive_decider.Interfaces;

namespace indecisive_decider.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public UserService(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        /// <summary>
        /// Gets all users of the app
        /// </summary>
        /// <returns>All users of the app</returns>
        public async Task<IEnumerable<ApplicationUser>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        /// <summary>
        /// Gets a user by Id
        /// </summary>
        /// <param name="id">Id of the user</param>
        /// <returns>The user</returns>
        public async Task<ApplicationUser> GetUserByIdAsync(string id)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        }
        /// <summary>
        /// Searches for a user
        /// </summary>
        /// <param name="name">The query</param>
        /// <returns>A list of users that match the query</returns>
        public async Task<IEnumerable<ApplicationUser>> GetUsersByNameOrEmailAsync(string name)
        {
            
            return await _context.Users.Where(user => user.UserName.Contains(name) || user.Email.Contains(name)).ToListAsync();
        }
        /// <summary>
        /// Changes a users password
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="oldPassword">The users old password</param>
        /// <param name="newPassword">The new password</param>
        /// <returns>True if operation was successful</returns>
        public async Task<bool> ChangeUserPassword(string userId, string oldPassword, string newPassword)
        {
            var user = await GetUserByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return result.Succeeded;
        }
        /// <summary>
        /// Verifies the user token then fetches the current user.
        /// </summary>
        /// <param name="userClaims">The user claims</param>
        /// <returns>The signed in user</returns>
        public async Task<ApplicationUser> VerifyUser(ClaimsPrincipal userClaims)
        {
            var id = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await GetUserByIdAsync(id);
            return user;
        }   

    }
}
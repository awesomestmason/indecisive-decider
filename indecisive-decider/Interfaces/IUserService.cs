using System.Collections.Generic;
using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace indecisive_decider.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Gets all users of the app
        /// </summary>
        /// <returns>All users of the app</returns>
        Task<IEnumerable<ApplicationUser>> GetUsers();

        /// <summary>
        /// Gets a user by Id
        /// </summary>
        /// <param name="id">Id of the user</param>
        /// <returns>The user</returns>        
        Task<ApplicationUser> GetUserByIdAsync(string id);
        /// <summary>
        /// Searches for a user
        /// </summary>
        /// <param name="name">The query</param>
        /// <returns>A list of users that match the query</returns>
        Task<IEnumerable<ApplicationUser>> GetUsersByNameOrEmailAsync(string name);
        /// <summary>
        /// Changes a users password
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="oldPassword">The users old password</param>
        /// <param name="newPassword">The new password</param>
        /// <returns>True if operation was successful</returns>
        Task<bool> ChangeUserPassword(string userId, string oldPassword, string newPassword);

        /// <summary>
        /// Verifies the user token then fetches the current user.
        /// </summary>
        /// <param name="userClaims">The user claims</param>
        /// <returns>The signed in user</returns>
        Task<ApplicationUser> VerifyUser(ClaimsPrincipal userClaims);  

    }
}
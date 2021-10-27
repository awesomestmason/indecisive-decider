using System.Threading.Tasks;
using indecisive_decider.Data;
using indecisive_decider.Entities;
using Microsoft.EntityFrameworkCore;

namespace indecisive_decider.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

    }
}
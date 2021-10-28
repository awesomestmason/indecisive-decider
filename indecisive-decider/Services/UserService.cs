using System.Collections.Generic;
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

        public async Task<IEnumerable<ApplicationUser>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }


        public async Task<ApplicationUser> GetUserByIdAsync(string id)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        }
    }
}
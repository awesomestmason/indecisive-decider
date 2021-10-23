using indecisive_decider.Dtos;
using indecisive_decider.Entities;

namespace indecisive_decider.Controllers.Account
{
    public class LoginResponse
    {
        public string JwtToken { get; set; }
        public UserDto User { get; set; }
    }
}
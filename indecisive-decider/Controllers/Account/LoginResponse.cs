using indecisive_decider.Dtos;
using indecisive_decider.Entities;

/// <summary>
/// Takes the toekn to link the user with the account
/// </summary>
namespace indecisive_decider.Controllers.Account
{
    public class LoginResponse
    {
        public string JwtToken { get; set; }
        public UserDto User { get; set; }
    }
}
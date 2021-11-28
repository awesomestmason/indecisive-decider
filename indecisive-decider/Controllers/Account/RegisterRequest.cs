using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;

/// <summary>
/// Makes sure the user has password and confirms correct password.
/// </summary>
namespace indecisive_decider.Controllers.Account
{
    public class RegisterRequest
    {
        public UserDto User { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace indecisive_decider.Controllers.Account
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

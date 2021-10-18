using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Entities;

namespace indecisive_decider.Controllers.Account
{
    public class RegisterRequest
    {
        public ApplicationUser User { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}

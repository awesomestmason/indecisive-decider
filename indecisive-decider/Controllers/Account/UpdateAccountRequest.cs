using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;

/// <summary>
/// Allows user to be able to get and set new email and username.
/// </summary>
namespace indecisive_decider.Controllers.Account
{
    public class UpdateAccountRequest
    {
        public string Username {get; set;}
        public string Email {get; set;}

    }
}

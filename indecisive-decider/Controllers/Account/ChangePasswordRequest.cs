using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;

/// <summary>
/// File for getting and setting new password for the user.
/// </summary>
namespace indecisive_decider.Controllers.Account
{
    public class ChangePasswordRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword {get; set;}
        public string ConfirmNewPassword {get; set;}


    }
}

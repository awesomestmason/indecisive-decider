using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;

/// <summary>
/// be able to get and set with the comment string item.
/// </summary>
namespace indecisive_decider.Controllers.Feed {
    public class PostCommentRequest
    {
        public string Comment {get; set; }
    }

}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;

//be able to get and set preset or result ID/values in order to share to other users.
namespace indecisive_decider.Controllers.Feed {
    public class ShareDecisionRequest
    {
        public string Result {get; set; }
        public int PresetId { get; set; }
    }

}


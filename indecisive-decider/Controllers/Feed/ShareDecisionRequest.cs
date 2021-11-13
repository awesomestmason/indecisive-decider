using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;

namespace indecisive_decider.Controllers.Feed {
    public class ShareDecisionRequest
    {
        public string Result {get; set; }
        public int PresetId { get; set; }
    }

}


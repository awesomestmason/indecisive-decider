using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace indecisive_decider.Interfaces
{
    public interface IRepository<T> : IRepositoryBase<T> where T : class
    {

    }
}

using Ardalis.Specification.EntityFrameworkCore;
using indecisive_decider.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace indecisive_decider.Data
{
    public class EfRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class
    {
        public EfRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}

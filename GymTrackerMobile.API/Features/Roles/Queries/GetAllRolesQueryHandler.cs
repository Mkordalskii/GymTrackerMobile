using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, IEnumerable<Role>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllRolesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> Handle(GetAllRolesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .AsNoTracking()//No tracking since we are only reading data and not modifying it
                .ToListAsync(cancellationToken);
        }
    }
}

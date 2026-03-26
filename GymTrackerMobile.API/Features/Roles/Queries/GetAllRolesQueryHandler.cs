using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Roles.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, IEnumerable<RoleDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllRolesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleDto>> Handle(GetAllRolesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .AsNoTracking()//No tracking since we are only reading data and not modifying it
                .Select(r => new RoleDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description
                })
                .ToListAsync(cancellationToken);
        }
    }
}

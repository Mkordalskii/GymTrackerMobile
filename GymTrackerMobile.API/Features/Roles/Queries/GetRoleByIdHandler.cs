using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Roles.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public class GetRoleByIdHandler : IRequestHandler<GetRoleByIdQuery, RoleDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetRoleByIdHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<RoleDto?> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .AsNoTracking()
                .Where(r => r.Id == request.Id)
                .ProjectToType<RoleDto>() // Use Mapster to project the Role entity to RoleDto
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

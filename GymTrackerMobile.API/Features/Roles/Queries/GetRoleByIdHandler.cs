using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public class GetRoleByIdHandler : IRequestHandler<GetRoleByIdQuery, Role?>
    {
        private readonly GymTrackerDbContext _context;

        public GetRoleByIdHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<Role?> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
        }
    }
}

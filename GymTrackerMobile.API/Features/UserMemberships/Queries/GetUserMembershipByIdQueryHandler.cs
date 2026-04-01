using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.UserMemberships.Queries
{
    public class GetUserMembershipByIdQueryHandler : IRequestHandler<GetUserMembershipByIdQuery, UserMembershipDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetUserMembershipByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<UserMembershipDto?> Handle(GetUserMembershipByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.UserMemberships
                .AsNoTracking()
                .Where(x => x.Id == request.Id)
                .ProjectToType<UserMembershipDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

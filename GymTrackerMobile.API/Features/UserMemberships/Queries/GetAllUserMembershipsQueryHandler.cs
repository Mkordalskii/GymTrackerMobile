using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.UserMemberships.Queries
{
    public class GetAllUserMembershipsQueryHandler : IRequestHandler<GetAllUserMembershipsQuery, IEnumerable<UserMembershipDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllUserMembershipsQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserMembershipDto>> Handle(GetAllUserMembershipsQuery request, CancellationToken cancellationToken)
        {
            return await _context.UserMemberships
                .AsNoTracking()
                .ProjectToType<UserMembershipDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

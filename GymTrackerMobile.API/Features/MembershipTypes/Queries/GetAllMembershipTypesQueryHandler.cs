using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace GymTrackerMobile.API.Features.MembershipTypes.Queries
{
    public class GetAllMembershipTypesQueryHandler : IRequestHandler<GetAllMembershipTypesQuery, IEnumerable<MembershipTypeDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllMembershipTypesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MembershipTypeDto>> Handle(GetAllMembershipTypesQuery request, CancellationToken cancellationToken)
        {
            return await _context.MembershipTypes
                .AsNoTracking()
                .ProjectToType<MembershipTypeDto>()
                .ToListAsync(cancellationToken);

        }
    }
}

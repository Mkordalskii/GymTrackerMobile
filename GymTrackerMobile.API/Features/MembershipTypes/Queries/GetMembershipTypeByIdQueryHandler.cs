using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.MembershipTypes.Queries
{
    public class GetMembershipTypeByIdQueryHandler : IRequestHandler<GetMembershipTypeByIdQuery, MembershipTypeDto?>
    {
        private readonly GymTrackerDbContext _context;
        public GetMembershipTypeByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<MembershipTypeDto?> Handle(GetMembershipTypeByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.MembershipTypes
                .AsNoTracking()
                .Where(m => m.Id == request.Id)
                .ProjectToType<MembershipTypeDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

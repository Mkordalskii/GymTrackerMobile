using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Users.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Users.Queries
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserDto>>
    {
        private readonly GymTrackerDbContext _context;
        public GetAllUsersQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .ProjectToType<UserDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Users.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Users.Queries
{
    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto?>
    {
        private readonly GymTrackerDbContext _context;
        public GetUserByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto?> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(u => u.Id == request.Id)
                .ProjectToType<UserDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

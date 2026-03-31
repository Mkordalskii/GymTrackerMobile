using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Users.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Users.Commands
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;
        public CreateUserCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var roleExists = await _context.Roles
                .AnyAsync(r => r.Id == request.RoleId, cancellationToken);

            if (!roleExists)
                throw new ArgumentException("Selected role does not exist.");

            var emailExists = await _context.Users
                .AnyAsync(u => u.Email == request.Email, cancellationToken);

            if (emailExists)
                throw new ArgumentException("User with this email already exists.");

            var user = _mapper.Map<User>(request);

            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.Users
                .AsNoTracking()
                .Where(u => u.Id == user.Id)
                .ProjectToType<UserDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

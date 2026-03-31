using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Users.Commands
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateUserCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

            if (user is null)
                return false;

            var roleExists = await _context.Roles
                .AnyAsync(r => r.Id == request.RoleId, cancellationToken);

            if (!roleExists)
                throw new ArgumentException("Selected role does not exist.");

            var emailTaken = await _context.Users
                .AnyAsync(u => u.Email == request.Email && u.Id != request.Id, cancellationToken);

            if (emailTaken)
                throw new ArgumentException("User with this email already exists.");

            _mapper.Map(request, user);

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

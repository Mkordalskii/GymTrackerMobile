using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Role>
    {
        private readonly GymTrackerDbContext _context;

        public CreateRoleCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<Role> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var role = new Role
            {
                Name = request.Name,
                Description = request.Description
            };
            _context.Roles.Add(role);
            await _context.SaveChangesAsync(cancellationToken);
            return role;
        }
    }
}

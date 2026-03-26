using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Roles.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, RoleDto>
    {
        private readonly GymTrackerDbContext _context;

        public CreateRoleCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<RoleDto> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var role = new Role
            {
                Name = request.Name,
                Description = request.Description
            };
            _context.Roles.Add(role);
            await _context.SaveChangesAsync(cancellationToken);
            return new RoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description
            };
        }
    }
}

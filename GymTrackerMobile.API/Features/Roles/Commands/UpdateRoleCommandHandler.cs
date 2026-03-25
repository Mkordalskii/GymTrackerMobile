using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public UpdateRoleCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
        {
           var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
            if (role == null)
            {
                return false;
            }
            role.Name = request.Name;
            role.Description = request.Description;
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

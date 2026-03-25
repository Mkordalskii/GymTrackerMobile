using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteRoleCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            var role = await _context.Roles.
                FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
            if (role == null) return false;
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

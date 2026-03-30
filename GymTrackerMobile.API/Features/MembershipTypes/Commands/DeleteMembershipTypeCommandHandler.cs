using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands
{
    public class DeleteMembershipTypeCommandHandler : IRequestHandler<DeleteMembershipTypeCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteMembershipTypeCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteMembershipTypeCommand request, CancellationToken cancellationToken)
        {
            var membershipType = await _context.MembershipTypes.FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);
            if (membershipType is null) return false;
            _context.MembershipTypes.Remove(membershipType);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

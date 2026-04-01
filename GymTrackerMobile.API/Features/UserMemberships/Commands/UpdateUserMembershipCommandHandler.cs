using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.UserMemberships.Commands
{
    public class UpdateUserMembershipCommandHandler : IRequestHandler<UpdateUserMembershipCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateUserMembershipCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateUserMembershipCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.UserMemberships
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");
            var membershipTypeExists = await _context.MembershipTypes.AnyAsync(mt => mt.Id == request.MembershipTypeId, cancellationToken);
            if (!membershipTypeExists)
                throw new ArgumentException("Selected membership type does not exist.");

            _mapper.Map(request, entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

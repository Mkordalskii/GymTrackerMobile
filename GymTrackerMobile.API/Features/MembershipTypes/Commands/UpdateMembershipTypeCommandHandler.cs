using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands
{
    public class UpdateMembershipTypeCommandHandler : IRequestHandler<UpdateMembershipTypeCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateMembershipTypeCommandHandler(IMapper mapper, GymTrackerDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Handle(UpdateMembershipTypeCommand request, CancellationToken cancellationToken)
        {
            var membershipType = await _context.MembershipTypes.FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);
            if (membershipType is null) return false;
            _mapper.Map(request, membershipType);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using MapsterMapper;
using MediatR;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands
{
    public class CreateMembershipTypeCommandHandler : IRequestHandler<CreateMembershipTypeCommand, MembershipTypeDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateMembershipTypeCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MembershipTypeDto> Handle(CreateMembershipTypeCommand request, CancellationToken cancellationToken)
        {
            var membershipType = _mapper.Map<MembershipType>(request);
            _context.MembershipTypes.Add(membershipType);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<MembershipTypeDto>(membershipType);
        }
    }
}

using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.UserMemberships.Commands
{
    public class CreateUserMembershipCommandHandler : IRequestHandler<CreateUserMembershipCommand, UserMembershipDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateUserMembershipCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserMembershipDto> Handle(CreateUserMembershipCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");
            var membershipTypeExists = await _context.MembershipTypes.AnyAsync(mt => mt.Id == request.MembershipTypeId, cancellationToken);
            if (!membershipTypeExists)
                throw new ArgumentException("Selected membership type does not exist.");

            var entity = _mapper.Map<UserMembership>(request);
            _context.UserMemberships.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.UserMemberships
                .AsNoTracking()
                .Where(x => x.Id == entity.Id)
                .ProjectToType<UserMembershipDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

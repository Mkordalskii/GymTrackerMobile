using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateRoleCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
        {
            var role = await _context.Roles
                 .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
            if (role == null)
            {
                return false;
            }
            _mapper.Map(request, role);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

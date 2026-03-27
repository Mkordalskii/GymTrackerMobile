using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Roles.Dtos;
using MapsterMapper;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, RoleDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateRoleCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RoleDto> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var role = _mapper.Map<Role>(request);
            _context.Roles.Add(role);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<RoleDto>(role);
        }
    }
}

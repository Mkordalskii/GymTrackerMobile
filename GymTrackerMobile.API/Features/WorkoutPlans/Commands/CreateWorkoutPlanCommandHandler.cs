using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands
{
    public class CreateWorkoutPlanCommandHandler : IRequestHandler<CreateWorkoutPlanCommand, WorkoutPlanDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateWorkoutPlanCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkoutPlanDto> Handle(CreateWorkoutPlanCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users
                .AnyAsync(u => u.Id == request.UserId, cancellationToken);

            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");

            var entity = _mapper.Map<WorkoutPlan>(request);
            _context.WorkoutPlans.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.WorkoutPlans
                .AsNoTracking()
                .Where(x => x.Id == entity.Id)
                .ProjectToType<WorkoutPlanDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

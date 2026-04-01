using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands
{
    public class CreateWorkoutPlanExerciseCommandHandler : IRequestHandler<CreateWorkoutPlanExerciseCommand, WorkoutPlanExerciseDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateWorkoutPlanExerciseCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkoutPlanExerciseDto> Handle(CreateWorkoutPlanExerciseCommand request, CancellationToken cancellationToken)
        {
            var workoutPlanExists = await _context.WorkoutPlans.AnyAsync(wp => wp.Id == request.WorkoutPlanId, cancellationToken);
            if (!workoutPlanExists)
                throw new ArgumentException("Selected workout plan does not exist.");
            var exerciseExists = await _context.Exercises.AnyAsync(e => e.Id == request.ExerciseId, cancellationToken);
            if (!exerciseExists)
                throw new ArgumentException("Selected exercise does not exist.");

            var entity = _mapper.Map<WorkoutPlanExercise>(request);
            _context.WorkoutPlanExercises.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.WorkoutPlanExercises
                .AsNoTracking()
                .Where(x => x.Id == entity.Id)
                .ProjectToType<WorkoutPlanExerciseDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands
{
    public class UpdateWorkoutPlanExerciseCommandHandler : IRequestHandler<UpdateWorkoutPlanExerciseCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateWorkoutPlanExerciseCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateWorkoutPlanExerciseCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.WorkoutPlanExercises
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            var workoutPlanExists = await _context.WorkoutPlans.AnyAsync(wp => wp.Id == request.WorkoutPlanId, cancellationToken);
            if (!workoutPlanExists)
                throw new ArgumentException("Selected workout plan does not exist.");
            var exerciseExists = await _context.Exercises.AnyAsync(e => e.Id == request.ExerciseId, cancellationToken);
            if (!exerciseExists)
                throw new ArgumentException("Selected exercise does not exist.");

            _mapper.Map(request, entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

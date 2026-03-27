using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Exercises.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Exercises.Commands
{
    public class CreateExerciseCommandHandler : IRequestHandler<CreateExerciseCommand, ExerciseDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateExerciseCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ExerciseDto> Handle(CreateExerciseCommand request, CancellationToken cancellationToken)
        {
            var categoryExists = await _context.ExerciseCategories
                .AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

            if (!categoryExists)
                throw new ArgumentException("Selected category does not exist.");

            var exercise = _mapper.Map<Exercise>(request);

            _context.Exercises.Add(exercise);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.Exercises
                .AsNoTracking()
                .Where(e => e.Id == exercise.Id)
                .ProjectToType<ExerciseDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

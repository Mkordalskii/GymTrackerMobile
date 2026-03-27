using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using MapsterMapper;
using MediatR;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public class CreateExerciseCategoryCommandHandler : IRequestHandler<CreateExerciseCategoryCommand, ExerciseCategoryDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateExerciseCategoryCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ExerciseCategoryDto> Handle(CreateExerciseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = _mapper.Map<ExerciseCategory>(request);
            _context.ExerciseCategories.Add(category);
            await _context.SaveChangesAsync();

            return _mapper.Map<ExerciseCategoryDto>(category);
        }
    }
}

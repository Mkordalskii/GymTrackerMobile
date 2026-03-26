using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public class CreateExerciseCategoryCommandHandler : IRequestHandler<CreateExerciseCategoryCommand, ExerciseCategoryDto>
    {
        private readonly GymTrackerDbContext _context;

        public CreateExerciseCategoryCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<ExerciseCategoryDto> Handle(CreateExerciseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new ExerciseCategory
            {
                Name = request.Name,
                Description = request.Description
            };
            _context.ExerciseCategories.Add(category);
            await _context.SaveChangesAsync();

            return new ExerciseCategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description
            };
        }
    }
}

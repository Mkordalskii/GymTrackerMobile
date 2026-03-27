using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public class UpdateExerciseCategoryCommandHandler : IRequestHandler<UpdateExerciseCategoryCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateExerciseCategoryCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateExerciseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.ExerciseCategories.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (category == null) return false;

            _mapper.Map(request, category);

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

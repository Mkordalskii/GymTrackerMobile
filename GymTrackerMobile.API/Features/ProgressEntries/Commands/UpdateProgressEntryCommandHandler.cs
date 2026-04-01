using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands
{
    public class UpdateProgressEntryCommandHandler : IRequestHandler<UpdateProgressEntryCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateProgressEntryCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateProgressEntryCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ProgressEntries
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");
            var exerciseExists = await _context.Exercises.AnyAsync(e => e.Id == request.ExerciseId, cancellationToken);
            if (!exerciseExists)
                throw new ArgumentException("Selected exercise does not exist.");

            _mapper.Map(request, entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

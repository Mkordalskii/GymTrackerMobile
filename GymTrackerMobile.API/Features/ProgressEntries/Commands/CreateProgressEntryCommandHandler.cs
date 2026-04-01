using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands
{
    public class CreateProgressEntryCommandHandler : IRequestHandler<CreateProgressEntryCommand, ProgressEntryDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateProgressEntryCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProgressEntryDto> Handle(CreateProgressEntryCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");
            var exerciseExists = await _context.Exercises.AnyAsync(e => e.Id == request.ExerciseId, cancellationToken);
            if (!exerciseExists)
                throw new ArgumentException("Selected exercise does not exist.");

            var entity = _mapper.Map<ProgressEntry>(request);
            _context.ProgressEntries.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.ProgressEntries
                .AsNoTracking()
                .Where(x => x.Id == entity.Id)
                .ProjectToType<ProgressEntryDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

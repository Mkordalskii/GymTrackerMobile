using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands
{
    public class DeleteProgressEntryCommandHandler : IRequestHandler<DeleteProgressEntryCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteProgressEntryCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteProgressEntryCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.ProgressEntries
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            _context.ProgressEntries.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

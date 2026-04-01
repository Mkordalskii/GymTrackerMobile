using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ProgressEntries.Queries
{
    public class GetProgressEntryByIdQueryHandler : IRequestHandler<GetProgressEntryByIdQuery, ProgressEntryDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetProgressEntryByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<ProgressEntryDto?> Handle(GetProgressEntryByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.ProgressEntries
                .AsNoTracking()
                .Where(x => x.Id == request.Id)
                .ProjectToType<ProgressEntryDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

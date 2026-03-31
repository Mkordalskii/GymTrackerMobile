using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ProgressEntries.Queries
{
    public class GetAllProgressEntriesQueryHandler : IRequestHandler<GetAllProgressEntriesQuery, IEnumerable<ProgressEntryDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllProgressEntriesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProgressEntryDto>> Handle(GetAllProgressEntriesQuery request, CancellationToken cancellationToken)
        {
            return await _context.ProgressEntries
                .AsNoTracking()
                .ProjectToType<ProgressEntryDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

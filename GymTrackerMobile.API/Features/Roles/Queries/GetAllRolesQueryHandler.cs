using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Roles.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, IEnumerable<RoleDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllRolesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleDto>> Handle(GetAllRolesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Roles
                .AsNoTracking()//No tracking since we are only reading data and not modifying it
                .ProjectToType<RoleDto>()//Mapowanie bezpośrednio w zapytaniu do bazy danych, co jest bardziej wydajne niż pobieranie encji i mapowanie ich w pamięci
                .ToListAsync(cancellationToken);
        }
    }
}

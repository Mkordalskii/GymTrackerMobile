using GymTrackerMobile.API.Features.Roles.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Queries

{
    public record GetAllRolesQuery() : IRequest<IEnumerable<RoleDto>>;
}
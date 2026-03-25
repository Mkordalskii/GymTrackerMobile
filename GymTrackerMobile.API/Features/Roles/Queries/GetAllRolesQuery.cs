using GymTrackerMobile.API.Entities;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Queries

{
    public record GetAllRolesQuery() : IRequest<IEnumerable<Role>>;
}
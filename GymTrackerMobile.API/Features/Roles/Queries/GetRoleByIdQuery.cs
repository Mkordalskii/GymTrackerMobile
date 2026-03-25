using GymTrackerMobile.API.Entities;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public record GetRoleByIdQuery(int Id) : IRequest<Role>;
}

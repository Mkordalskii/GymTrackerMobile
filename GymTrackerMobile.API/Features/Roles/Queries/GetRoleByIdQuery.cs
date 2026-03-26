using GymTrackerMobile.API.Features.Roles.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Queries
{
    public record GetRoleByIdQuery(int Id) : IRequest<RoleDto?>;
}

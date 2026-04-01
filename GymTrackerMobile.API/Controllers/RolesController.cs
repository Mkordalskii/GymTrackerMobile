using GymTrackerMobile.API.Features.Roles.Commands;
using GymTrackerMobile.API.Features.Roles.Dtos;
using GymTrackerMobile.API.Features.Roles.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RolesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetAll()
        {
            var roles = await _mediator.Send(new GetAllRolesQuery());
            return Ok(roles);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<RoleDto>> GetById(int id)
        {
            var role = await _mediator.Send(new GetRoleByIdQuery(id));
            if (role == null)
            {
                return NotFound(new { message = $"The specified ID - {id} was not found" });
            }
            return Ok(role);
        }

        [HttpPost]
        public async Task<ActionResult<RoleDto>> Create([FromBody] CreateRoleCommand command)
        {
            var createdRole = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = createdRole.Id }, createdRole);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRoleCommand command)
        {
            if (id != command.Id)
                return BadRequest("The ID in the URL must match the ID in the body.");

            var updated = await _mediator.Send(command);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _mediator.Send(new DeleteRoleCommand(id));

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}

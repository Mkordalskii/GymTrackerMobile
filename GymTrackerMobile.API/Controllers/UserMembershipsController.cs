using GymTrackerMobile.API.Features.UserMemberships.Commands;
using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using GymTrackerMobile.API.Features.UserMemberships.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserMembershipsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserMembershipsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserMembershipDto>>> GetAll()
        {
            var items = await _mediator.Send(new GetAllUserMembershipsQuery());
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserMembershipDto>> GetById(int id)
        {
            var item = await _mediator.Send(new GetUserMembershipByIdQuery(id));
            if (item is null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<UserMembershipDto>> Create(CreateUserMembershipCommand command)
        {
            var created = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateUserMembershipCommand command)
        {
            if (id != command.Id)
                return BadRequest("Id in URL must match Id in body.");
            var updated = await _mediator.Send(command);
            if (!updated)
                return NotFound();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _mediator.Send(new DeleteUserMembershipCommand(id));
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}

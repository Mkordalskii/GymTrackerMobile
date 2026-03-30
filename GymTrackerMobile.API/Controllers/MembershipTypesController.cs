using GymTrackerMobile.API.Features.MembershipTypes.Commands;
using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using GymTrackerMobile.API.Features.MembershipTypes.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembershipTypesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MembershipTypesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MembershipTypeDto>>> GetAll()
        {
            var membershipTypes = await _mediator.Send(new GetAllMembershipTypesQuery());
            return Ok(membershipTypes);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<MembershipTypeDto>> GetById(int id)
        {
            var membershipType = await _mediator.Send(new GetMembershipTypeByIdQuery(id));

            if (membershipType is null)
                return NotFound();

            return Ok(membershipType);
        }

        [HttpPost]
        public async Task<ActionResult<MembershipTypeDto>> Create(CreateMembershipTypeCommand command)
        {
            var createdMembershipType = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = createdMembershipType.Id }, createdMembershipType);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateMembershipTypeCommand command)
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
            var deleted = await _mediator.Send(new DeleteMembershipTypeCommand(id));

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}

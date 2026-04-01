using GymTrackerMobile.API.Features.WorkoutSessions.Commands;
using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using GymTrackerMobile.API.Features.WorkoutSessions.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutSessionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public WorkoutSessionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutSessionDto>>> GetAll()
        {
            var items = await _mediator.Send(new GetAllWorkoutSessionsQuery());
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<WorkoutSessionDto>> GetById(int id)
        {
            var item = await _mediator.Send(new GetWorkoutSessionByIdQuery(id));
            if (item is null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutSessionDto>> Create(CreateWorkoutSessionCommand command)
        {
            var created = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateWorkoutSessionCommand command)
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
            var deleted = await _mediator.Send(new DeleteWorkoutSessionCommand(id));
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}

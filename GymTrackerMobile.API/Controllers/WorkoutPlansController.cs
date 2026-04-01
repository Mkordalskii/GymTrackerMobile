using GymTrackerMobile.API.Features.WorkoutPlans.Commands;
using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using GymTrackerMobile.API.Features.WorkoutPlans.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutPlansController : ControllerBase
    {
        private readonly IMediator _mediator;

        public WorkoutPlansController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutPlanDto>>> GetAll()
        {
            var items = await _mediator.Send(new GetAllWorkoutPlansQuery());
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<WorkoutPlanDto>> GetById(int id)
        {
            var item = await _mediator.Send(new GetWorkoutPlanByIdQuery(id));
            if (item is null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutPlanDto>> Create(CreateWorkoutPlanCommand command)
        {
            var created = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateWorkoutPlanCommand command)
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
            var deleted = await _mediator.Send(new DeleteWorkoutPlanCommand(id));
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}

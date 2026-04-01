using GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutPlanExercisesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public WorkoutPlanExercisesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutPlanExerciseDto>>> GetAll()
        {
            var items = await _mediator.Send(new GetAllWorkoutPlanExercisesQuery());
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<WorkoutPlanExerciseDto>> GetById(int id)
        {
            var item = await _mediator.Send(new GetWorkoutPlanExerciseByIdQuery(id));
            if (item is null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutPlanExerciseDto>> Create(CreateWorkoutPlanExerciseCommand command)
        {
            var created = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateWorkoutPlanExerciseCommand command)
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
            var deleted = await _mediator.Send(new DeleteWorkoutPlanExerciseCommand(id));
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}

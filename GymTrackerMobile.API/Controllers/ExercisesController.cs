using GymTrackerMobile.API.Features.Exercises.Commands;
using GymTrackerMobile.API.Features.Exercises.Dtos;
using GymTrackerMobile.API.Features.Exercises.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ExercisesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ExercisesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseDto>>> GetAll()
        {
            var exercises = await _mediator.Send(new GetAllExercisesQuery());
            return Ok(exercises);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ExerciseDto>> GetById(int id)
        {
            var exercise = await _mediator.Send(new GetExerciseByIdQuery(id));

            if (exercise is null)
                return NotFound();

            return Ok(exercise);
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseDto>> Create(CreateExerciseCommand command)
        {
            var createdExercise = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = createdExercise.Id }, createdExercise);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateExerciseCommand command)
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
            var deleted = await _mediator.Send(new DeleteExerciseCommand(id));

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}

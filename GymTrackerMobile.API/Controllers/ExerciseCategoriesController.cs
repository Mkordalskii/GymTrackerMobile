using GymTrackerMobile.API.Features.ExerciseCategories.Commands;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using GymTrackerMobile.API.Features.ExerciseCategories.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExerciseCategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ExerciseCategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseCategoryDto>>> GetAll()
        {
            var categories = await _mediator.Send(new GetAllExerciseCategoriesQuery());
            return Ok(categories);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ExerciseCategoryDto>> GetById(int id)
        {
            var category = await _mediator.Send(new GetExerciseCategoryByIdQuery(id));

            if (category is null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseCategoryDto>> Create(CreateExerciseCategoryCommand command)
        {
            var createdCategory = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, createdCategory);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateExerciseCategoryCommand command)
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
            var deleted = await _mediator.Send(new DeleteExerciseCategoryCommand(id));

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}

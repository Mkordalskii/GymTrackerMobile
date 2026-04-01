using GymTrackerMobile.API.Features.ProgressEntries.Commands;
using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using GymTrackerMobile.API.Features.ProgressEntries.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgressEntriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProgressEntriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgressEntryDto>>> GetAll()
        {
            var items = await _mediator.Send(new GetAllProgressEntriesQuery());
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProgressEntryDto>> GetById(int id)
        {
            var item = await _mediator.Send(new GetProgressEntryByIdQuery(id));
            if (item is null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<ProgressEntryDto>> Create(CreateProgressEntryCommand command)
        {
            var created = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateProgressEntryCommand command)
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
            var deleted = await _mediator.Send(new DeleteProgressEntryCommand(id));
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}

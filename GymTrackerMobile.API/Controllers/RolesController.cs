using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly GymTrackerDbContext _context;

        public RolesController(GymTrackerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAll()
        {
            var roles = await _context.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpPost]
        public async Task<ActionResult<Role>> Create(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = role.Id }, role);
        }
    }
}

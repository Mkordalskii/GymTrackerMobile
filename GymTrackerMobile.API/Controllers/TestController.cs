using Microsoft.AspNetCore.Mvc;

namespace GymTrackerMobile.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                message = "API działa poprawnie"
            });
        }
    }
}

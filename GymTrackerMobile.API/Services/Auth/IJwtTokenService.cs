using GymTrackerMobile.API.Entities;

namespace GymTrackerMobile.API.Services.Auth
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user, string roleName);
    }
}

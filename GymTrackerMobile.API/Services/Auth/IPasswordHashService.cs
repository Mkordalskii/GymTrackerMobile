using GymTrackerMobile.API.Entities;

namespace GymTrackerMobile.API.Services.Auth
{
    public interface IPasswordHashService
    {
        string HashPassword(User user, string password);
        bool VerifyPassword(User user, string password, string providedPassword);
    }
}

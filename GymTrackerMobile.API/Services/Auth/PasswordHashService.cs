using GymTrackerMobile.API.Entities;
using Microsoft.AspNetCore.Identity;

namespace GymTrackerMobile.API.Services.Auth
{
    public class PasswordHashService : IPasswordHashService
    {
        private readonly PasswordHasher<User> _passwordHasher = new();
        public string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public bool VerifyPassword(User user, string password, string providedPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, password, providedPassword);
            return result == PasswordVerificationResult.Success
                || result == PasswordVerificationResult.SuccessRehashNeeded;
        }
    }
}

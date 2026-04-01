using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Services.Auth.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Services.Auth.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponseDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IPasswordHashService _passwordHashService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _configuration;

        public LoginCommandHandler(GymTrackerDbContext context, IPasswordHashService passwordHashService, IJwtTokenService jwtTokenService, IConfiguration configuration)
        {
            _context = context;
            _passwordHashService = passwordHashService;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

            if (user is null)
                throw new UnauthorizedAccessException("Invalid email or password.");

            var passwordValid = _passwordHashService.VerifyPassword(user, user.PasswordHash, request.Password);

            if (!passwordValid)
                throw new UnauthorizedAccessException("Invalid email or password.");

            var token = _jwtTokenService.GenerateToken(user, user.Role.Name);
            var expiresInMinutes = int.Parse(_configuration["Jwt:ExpiresInMinutes"]!);

            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                Role = user.Role.Name,
                ExpiresAtUtc = DateTime.UtcNow.AddMinutes(expiresInMinutes)
            };
        }
    }
}

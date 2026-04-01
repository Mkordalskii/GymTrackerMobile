using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Services.Auth.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Services.Auth.Commands
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponseDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IPasswordHashService _passwordHashService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _configuration;
        public RegisterCommandHandler(GymTrackerDbContext context, IPasswordHashService passwordHashService, IJwtTokenService jwtTokenService, IConfiguration configuration)
        {
            _context = context;
            _passwordHashService = passwordHashService;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var emailExists = await _context.Users
                .AnyAsync(u => u.Email == request.Email, cancellationToken);

            if (emailExists)
                throw new ArgumentException("User with this email already exists.");

            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.Id == request.RoleId, cancellationToken);

            if (role is null)
                throw new ArgumentException("Selected role does not exist.");

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                RoleId = request.RoleId
            };

            user.PasswordHash = _passwordHashService.HashPassword(user, request.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);

            var token = _jwtTokenService.GenerateToken(user, role.Name);
            var expiresInMinutes = int.Parse(_configuration["Jwt:ExpiresInMinutes"]!);

            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                Role = role.Name,
                ExpiresAtUtc = DateTime.UtcNow.AddMinutes(expiresInMinutes)
            };
        }
    }
}

using FluentValidation;

namespace GymTrackerMobile.API.Services.Auth.Commands
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().MaximumLength(150);

            RuleFor(x => x.Email)
                .NotEmpty().EmailAddress().MaximumLength(200);

            RuleFor(x => x.Password)
                .NotEmpty().MinimumLength(6);

            RuleFor(x => x.RoleId)
                .GreaterThan(0);
        }
    }
}

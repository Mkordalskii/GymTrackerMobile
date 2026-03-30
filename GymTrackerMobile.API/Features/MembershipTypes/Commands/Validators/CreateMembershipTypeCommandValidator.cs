using FluentValidation;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands.Validators
{
    public class CreateMembershipTypeCommandValidator : AbstractValidator<CreateMembershipTypeCommand>
    {
        public CreateMembershipTypeCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100).WithMessage("Name can have max 100 characters.");
            RuleFor(x => x.Description)
                .MaximumLength(250).WithMessage("Description can have max 250 characters.");
        }
    }
}

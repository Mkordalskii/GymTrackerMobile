using FluentValidation;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands.Validators
{
    public class UpdateMembershipTypeCommandValidator : AbstractValidator<UpdateMembershipTypeCommand>
    {
        public UpdateMembershipTypeCommandValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0.");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100).WithMessage("Name can have max 100 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(250).WithMessage("Description can have max 250 characters.");
        }
    }
}

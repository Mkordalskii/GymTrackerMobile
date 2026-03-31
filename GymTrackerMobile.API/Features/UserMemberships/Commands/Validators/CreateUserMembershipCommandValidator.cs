using FluentValidation;

namespace GymTrackerMobile.API.Features.UserMemberships.Commands.Validators
{
    public class CreateUserMembershipCommandValidator : AbstractValidator<CreateUserMembershipCommand>
    {
        public CreateUserMembershipCommandValidator()
        {
            RuleFor(x => x.UserId).GreaterThan(0).WithMessage("UserId must be greater than 0.");
            RuleFor(x => x.MembershipTypeId).GreaterThan(0).WithMessage("MembershipTypeId must be greater than 0.");
            RuleFor(x => x.StartDate).NotEmpty().WithMessage("StartDate is required.");
            RuleFor(x => x.EndDate).NotEmpty().WithMessage("EndDate is required.")
                .GreaterThanOrEqualTo(x => x.StartDate).WithMessage("EndDate must be greater than or equal to StartDate.");
            RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required.")
                .MaximumLength(50).WithMessage("Status can have max 50 characters.");
        }
    }
}

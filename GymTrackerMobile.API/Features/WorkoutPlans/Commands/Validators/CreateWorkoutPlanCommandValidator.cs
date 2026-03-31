using FluentValidation;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands.Validators
{
    public class CreateWorkoutPlanCommandValidator : AbstractValidator<CreateWorkoutPlanCommand>
    {
        public CreateWorkoutPlanCommandValidator()
        {
            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("UserId must be greater than 0.");
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(150).WithMessage("Name can have max 150 characters.");
            RuleFor(x => x.Goal)
                .MaximumLength(250).WithMessage("Goal can have max 250 characters.");
            RuleFor(x => x.CreatedAt)
                .NotEmpty().WithMessage("CreatedAt is required.");
        }
    }
}

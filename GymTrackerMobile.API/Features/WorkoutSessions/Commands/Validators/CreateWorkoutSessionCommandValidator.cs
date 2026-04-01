using FluentValidation;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands.Validators
{
    public class CreateWorkoutSessionCommandValidator : AbstractValidator<CreateWorkoutSessionCommand>
    {
        public CreateWorkoutSessionCommandValidator()
        {
            RuleFor(x => x.UserId).GreaterThan(0).WithMessage("UserId must be greater than 0.");
            RuleFor(x => x.WorkoutPlanId).GreaterThan(0).WithMessage("WorkoutPlanId must be greater than 0.");
            RuleFor(x => x.SessionDate).NotEmpty().WithMessage("SessionDate is required.");
            RuleFor(x => x.DurationMinutes).GreaterThan(0).WithMessage("DurationMinutes must be greater than 0.");
            RuleFor(x => x.Notes).MaximumLength(500).WithMessage("Notes can have max 500 characters.");
        }
    }
}

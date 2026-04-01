using FluentValidation;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands.Validators
{
    public class CreateProgressEntryCommandValidator : AbstractValidator<CreateProgressEntryCommand>
    {
        public CreateProgressEntryCommandValidator()
        {
            RuleFor(x => x.UserId).GreaterThan(0).WithMessage("UserId must be greater than 0.");
            RuleFor(x => x.ExerciseId).GreaterThan(0).WithMessage("ExerciseId must be greater than 0.");
            RuleFor(x => x.Weight).GreaterThanOrEqualTo(0).WithMessage("Weight must be greater than or equal to 0.");
            RuleFor(x => x.Reps).GreaterThan(0).WithMessage("Reps must be greater than 0.");
            RuleFor(x => x.CreatedAt).NotEmpty().WithMessage("CreatedAt is required.");
            RuleFor(x => x.Comment).MaximumLength(500).WithMessage("Comment can have max 500 characters.");
        }
    }
}

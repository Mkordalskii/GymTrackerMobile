using FluentValidation;

namespace GymTrackerMobile.API.Features.Exercises.Commands.Validators
{
    public class CreateExerciseCommandValidator : AbstractValidator<CreateExerciseCommand>
    {
        public CreateExerciseCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(150).WithMessage("Name can have max 150 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description can have max 500 characters.");

            RuleFor(x => x.DifficultyLevel)
                .NotEmpty().WithMessage("Difficulty level is required.")
                .MaximumLength(50).WithMessage("Difficulty level can have max 50 characters.");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("CategoryId must be greater than 0.");
        }
    }
}

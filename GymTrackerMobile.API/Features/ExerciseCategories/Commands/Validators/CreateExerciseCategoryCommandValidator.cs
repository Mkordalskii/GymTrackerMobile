using FluentValidation;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands.Validators
{
    public class CreateExerciseCategoryCommandValidator : AbstractValidator<CreateExerciseCategoryCommand>
    {
        public CreateExerciseCategoryCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(250).WithMessage("Description cannot exceed 250 characters.");
        }
    }
}

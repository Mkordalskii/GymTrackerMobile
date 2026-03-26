using FluentValidation;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands.Validators
{
    public class UpdateExerciseCategoryCommandValidator : AbstractValidator<UpdateExerciseCategoryCommand>
    {
        public UpdateExerciseCategoryCommandValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0.");

            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Name is required.")
               .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(250).WithMessage("Description cannot exceed 250 characters.");
        }
    }
}

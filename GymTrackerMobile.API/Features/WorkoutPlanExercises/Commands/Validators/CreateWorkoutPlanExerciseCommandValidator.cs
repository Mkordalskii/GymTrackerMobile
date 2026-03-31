using FluentValidation;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands.Validators
{
    public class CreateWorkoutPlanExerciseCommandValidator : AbstractValidator<CreateWorkoutPlanExerciseCommand>
    {
        public CreateWorkoutPlanExerciseCommandValidator()
        {
            RuleFor(x => x.WorkoutPlanId).GreaterThan(0).WithMessage("WorkoutPlanId must be greater than 0.");
            RuleFor(x => x.ExerciseId).GreaterThan(0).WithMessage("ExerciseId must be greater than 0.");
            RuleFor(x => x.Sets).GreaterThan(0).WithMessage("Sets must be greater than 0.");
            RuleFor(x => x.Reps).GreaterThan(0).WithMessage("Reps must be greater than 0.");
            RuleFor(x => x.OrderIndex).GreaterThan(0).WithMessage("OrderIndex must be greater than 0.");
        }
    }
}

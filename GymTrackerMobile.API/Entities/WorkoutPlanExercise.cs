namespace GymTrackerMobile.API.Entities
{
    public class WorkoutPlanExercise
    {
        public int Id { get; set; }
        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; } = null!;
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;
        public int Sets { get; set; }
        public int Reps { get; set; }
        public int OrderIndex { get; set; }
    }
}

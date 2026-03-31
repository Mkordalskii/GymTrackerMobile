namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos
{
    public class WorkoutPlanExerciseDto
    {
        public int Id { get; set; }
        public int WorkoutPlanId { get; set; }
        public int ExerciseId { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public int OrderIndex { get; set; }
    }
}

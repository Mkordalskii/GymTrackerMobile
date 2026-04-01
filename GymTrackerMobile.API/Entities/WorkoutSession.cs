namespace GymTrackerMobile.API.Entities
{
    public class WorkoutSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WorkoutPlanId { get; set; }
        public DateTime SessionDate { get; set; }
        public int DurationMinutes { get; set; }
        public string? Notes { get; set; }
        public User User { get; set; } = null!;
        public WorkoutPlan WorkoutPlan { get; set; } = null!;
    }
}

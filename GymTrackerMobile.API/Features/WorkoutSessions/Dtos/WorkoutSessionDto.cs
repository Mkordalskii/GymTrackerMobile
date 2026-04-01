namespace GymTrackerMobile.API.Features.WorkoutSessions.Dtos
{
    public class WorkoutSessionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WorkoutPlanId { get; set; }
        public DateTime SessionDate { get; set; }
        public int DurationMinutes { get; set; }
        public string? Notes { get; set; }
    }
}

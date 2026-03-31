namespace GymTrackerMobile.API.Features.WorkoutPlans.Dtos
{
    public class WorkoutPlanDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Goal { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

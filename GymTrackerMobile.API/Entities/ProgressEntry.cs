namespace GymTrackerMobile.API.Entities
{
    public class ProgressEntry
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public decimal Weight { get; set; }
        public int Reps { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Comment { get; set; }
        public User User { get; set; } = null!;
        public Exercise Exercise { get; set; } = null!;
    }
}

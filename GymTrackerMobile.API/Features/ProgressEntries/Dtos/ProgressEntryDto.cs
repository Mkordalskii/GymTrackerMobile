namespace GymTrackerMobile.API.Features.ProgressEntries.Dtos
{
    public class ProgressEntryDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public decimal Weight { get; set; }
        public int Reps { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Comment { get; set; }
    }
}

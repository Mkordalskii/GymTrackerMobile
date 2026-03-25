namespace GymTrackerMobile.API.Entities
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string DifficultyLevel { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public ExerciseCategory Category { get; set; } = null!;
    }
}

namespace GymTrackerMobile.API.Features.Exercises.Dtos
{
    public class ExerciseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string DifficultyLevel { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}

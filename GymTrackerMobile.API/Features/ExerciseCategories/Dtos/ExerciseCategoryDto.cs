namespace GymTrackerMobile.API.Features.ExerciseCategories.Dtos
{
    public class ExerciseCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}

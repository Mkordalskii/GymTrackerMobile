using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.ExerciseCategories.Commands;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class ExerciseCategoryMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<ExerciseCategory, ExerciseCategoryDto>();

            config.NewConfig<CreateExerciseCategoryCommand, ExerciseCategory>();

            config.NewConfig<UpdateExerciseCategoryCommand, ExerciseCategory>()
                .Ignore(dest => dest.Exercises);// Ignorujemy mapowanie kolekcji Exercises, ponieważ nie chcemy, aby podczas aktualizacji kategorii ćwiczeń były modyfikowane powiązane ćwiczenia.
        }
    }
}

using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Exercises.Commands;
using GymTrackerMobile.API.Features.Exercises.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class ExerciseMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Exercise, ExerciseDto>()
                .Map(dest => dest.CategoryName, src => src.Category.Name);

            config.NewConfig<CreateExerciseCommand, Exercise>();

            config.NewConfig<UpdateExerciseCommand, Exercise>()
                .Ignore(dest => dest.Category);
        }
    }
}

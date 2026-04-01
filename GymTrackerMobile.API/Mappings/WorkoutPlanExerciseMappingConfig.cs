using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class WorkoutPlanExerciseMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<WorkoutPlanExercise, WorkoutPlanExerciseDto>();
            config.NewConfig<CreateWorkoutPlanExerciseCommand, WorkoutPlanExercise>()
                .Ignore(dest => dest.WorkoutPlan)
                .Ignore(dest => dest.Exercise);
            config.NewConfig<UpdateWorkoutPlanExerciseCommand, WorkoutPlanExercise>()
                .Ignore(dest => dest.WorkoutPlan)
                .Ignore(dest => dest.Exercise);
        }
    }
}

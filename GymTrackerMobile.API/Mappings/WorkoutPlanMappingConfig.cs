using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.WorkoutPlans.Commands;
using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class WorkoutPlanMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<WorkoutPlan, WorkoutPlanDto>();
            config.NewConfig<CreateWorkoutPlanCommand, WorkoutPlan>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.WorkoutPlanExercises)
                .Ignore(dest => dest.WorkoutSessions);
            config.NewConfig<UpdateWorkoutPlanCommand, WorkoutPlan>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.WorkoutPlanExercises)
                .Ignore(dest => dest.WorkoutSessions);
        }
    }
}

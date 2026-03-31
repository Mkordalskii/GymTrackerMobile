using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.WorkoutSessions.Commands;
using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class WorkoutSessionMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<WorkoutSession, WorkoutSessionDto>();
            config.NewConfig<CreateWorkoutSessionCommand, WorkoutSession>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.WorkoutPlan);
            config.NewConfig<UpdateWorkoutSessionCommand, WorkoutSession>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.WorkoutPlan);
        }
    }
}

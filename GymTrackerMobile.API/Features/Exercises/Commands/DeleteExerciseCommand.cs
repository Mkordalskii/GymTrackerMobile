using MediatR;

namespace GymTrackerMobile.API.Features.Exercises.Commands
{
    public record DeleteExerciseCommand(int Id) : IRequest<bool>;
}

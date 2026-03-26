using GymTrackerMobile.API.Common.Middleware;
namespace GymTrackerMobile.API.Common.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}

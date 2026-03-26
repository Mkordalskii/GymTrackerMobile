using System.Net;
using System.Text.Json;
using FluentValidation;

namespace GymTrackerMobile.API.Common.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;

        public ExceptionMiddleware(
            RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _environment = environment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);

            context.Response.ContentType = "application/json";

            var response = new ErrorResponse
            {
                TraceId = context.TraceIdentifier
            };

            switch (exception)
            {
                case ValidationException validationEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response.Type = "ValidationError";
                    response.Title = "Validation failed";
                    response.Status = 400;
                    response.Errors = validationEx.Errors
                        .GroupBy(e => e.PropertyName)
                        .ToDictionary(
                            g => g.Key,
                            g => g.Select(e => e.ErrorMessage).ToArray());
                    break;

                case KeyNotFoundException keyNotFoundEx:
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    response.Type = "NotFound";
                    response.Title = keyNotFoundEx.Message;
                    response.Status = 404;
                    break;

                case ArgumentException argEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response.Type = "BadRequest";
                    response.Title = argEx.Message;
                    response.Status = 400;
                    break;

                case UnauthorizedAccessException:
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    response.Type = "Unauthorized";
                    response.Title = "Unauthorized";
                    response.Status = 401;
                    break;

                default:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    response.Type = "InternalServerError";
                    response.Title = _environment.IsDevelopment()
                        ? exception.Message
                        : "An unexpected server error occurred.";
                    response.Status = 500;

                    if (_environment.IsDevelopment())
                    {
                        response.Detail = exception.StackTrace;
                    }
                    break;
            }

            var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = _environment.IsDevelopment()
            });

            await context.Response.WriteAsync(json);
        }
    }

    public class ErrorResponse
    {
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int Status { get; set; }
        public string? Detail { get; set; }
        public string? TraceId { get; set; }
        public IDictionary<string, string[]>? Errors { get; set; }
    }
}

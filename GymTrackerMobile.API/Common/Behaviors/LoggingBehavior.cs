using System.Diagnostics;
using System.Text.Json;
using MediatR;

namespace GymTrackerMobile.API.Common.Behaviors
{
    public class LoggingBehavior<TReqest, TResponse> : IPipelineBehavior<TReqest, TResponse>
        where TReqest : notnull
    {
        private readonly ILogger<LoggingBehavior<TReqest, TResponse>> _logger;

        public LoggingBehavior(ILogger<LoggingBehavior<TReqest, TResponse>> logger)
        {
            _logger = logger;
        }

        public async Task<TResponse> Handle(TReqest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var requestName = typeof(TReqest).Name;
            var requestId = Guid.NewGuid().ToString("N")[..8];

            _logger.LogInformation(
                "[{RequestId}] START {RequestName}",
                requestId, requestName);

            if (_logger.IsEnabled(LogLevel.Debug))
            {
                try
                {
                    var requestJson = JsonSerializer.Serialize(request, new JsonSerializerOptions
                    {
                        WriteIndented = false,
                        MaxDepth = 3
                    });

                    _logger.LogDebug("[{RequestId}] Request: {Request}", requestId, requestJson);
                }
                catch
                {
                    _logger.LogDebug("[{RequestId}] Request: (serialization failed)", requestId);
                }
            }

            var stopwatch = Stopwatch.StartNew();

            try
            {
                var response = await next();

                stopwatch.Stop();

                _logger.LogInformation(
                    "[{RequestId}] END {RequestName} ({ElapsedMs}ms)",
                    requestId, requestName, stopwatch.ElapsedMilliseconds);

                if (stopwatch.ElapsedMilliseconds > 500)
                {
                    _logger.LogWarning(
                        "[{RequestId}] SLOW {RequestName} ({ElapsedMs}ms)",
                        requestId, requestName, stopwatch.ElapsedMilliseconds);
                }

                return response;
            }
            catch (Exception ex)
            {
                stopwatch.Stop();

                _logger.LogError(
                    ex,
                    "[{RequestId}] FAIL {RequestName} ({ElapsedMs}ms) - {ErrorMessage}",
                    requestId, requestName, stopwatch.ElapsedMilliseconds, ex.Message);

                throw;
            }
        }
    }
}

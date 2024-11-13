using Client.Checklist.API.Repository;
using Client.Checklist.API.Telemetry;
using Client.Checklist.Shared.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;
using System.Net;
using System.Text.Json;

namespace Client.Checklist.API.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _requiredRole;
        private readonly ActivitySource _activitySource;

        public AuthorizeAttribute(Instrumentation instrumentation, string requiredRole = null)
        {
            _requiredRole = requiredRole;
            _activitySource = instrumentation.ActivitySource;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            using (var activity = _activitySource.StartActivity("authorize"))
            {
                var httpContext = context.HttpContext;

                var token = httpContext.Request.Headers["x-client-token"].FirstOrDefault() ?? httpContext.Request.Headers["x-user-token"].FirstOrDefault();

                activity?.SetTag("token", token);

                if (string.IsNullOrEmpty(token))
                {
                    context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Unauthorized, message = "Missing Authorization" }) { StatusCode = StatusCodes.Status401Unauthorized };
                    return;
                }

                var authRepository = httpContext.RequestServices.GetService(typeof(IAuthRepository)) as IAuthRepository;
                if (authRepository == null)
                {
                    context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Unauthorized, message = "Authorization service unavailable" }) { StatusCode = StatusCodes.Status401Unauthorized };
                    return;
                }

                var authResponse = Task.Run(() => authRepository.Authenticate(token)).Result;

                activity?.SetTag("auth response", JsonSerializer.Serialize(authResponse));

                if (authResponse.StatusCode != StatusCode.Success)
                {
                    context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Unauthorized, Message = $"Missing Or Unsupported Token In Request Headers" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }

                if (!string.IsNullOrEmpty(_requiredRole) && _requiredRole == "Admin")
                {
                    if (!authResponse.Result.RoleName.Contains("Super Admin"))
                    {
                        context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Forbidden, Message = "Insufficient access permission" })
                        {
                            StatusCode = StatusCodes.Status403Forbidden
                        };
                    }
                }

                activity?.SetStatus(ActivityStatusCode.Ok);

                return;
            }
        }
    }
}

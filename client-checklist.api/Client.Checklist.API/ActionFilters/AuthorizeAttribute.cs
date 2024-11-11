using Client.Checklist.API.Repository;
using Client.Checklist.Shared.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace Client.Checklist.API.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _requiredRole;

        public AuthorizeAttribute(string requiredRole = null)
        {
            _requiredRole = requiredRole;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var httpContext = context.HttpContext;

            var token = httpContext.Request.Headers["x-client-token"].FirstOrDefault() ?? httpContext.Request.Headers["x-user-token"].FirstOrDefault();

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

            var authResponse = authRepository.Authenticate(token);

            if (authResponse.Result.StatusCode != StatusCode.Success)
            {
                context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Unauthorized, Message = $"Missing Or Unsupported Token In Request Headers" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (!string.IsNullOrEmpty(_requiredRole) && _requiredRole == "Admin")
            {
                if (!authResponse.Result.Result.RoleName.Contains("Super Admin"))
                {
                    context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Forbidden, Message = "Insufficient access permission" })
                    {
                        StatusCode = StatusCodes.Status403Forbidden
                    };
                }
            }

            return;
        }
    }
}

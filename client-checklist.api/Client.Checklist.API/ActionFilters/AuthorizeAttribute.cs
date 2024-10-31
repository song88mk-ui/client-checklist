using Client.Checklist.API.Repository;
using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;
using System.Net;

namespace Client.Checklist.API.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var httpContext = context.HttpContext;

            var token = httpContext.Request.Headers["x-client-token"].FirstOrDefault() ?? httpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var authRepository = httpContext.RequestServices.GetService(typeof(IAuthRepository)) as IAuthRepository;

            if (string.IsNullOrEmpty(token))
            {
                context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Unauthorized, message = "Missing Authorization" }) { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }
            else
            {
                var authResponse = authRepository.Authenticate(token);

                if (authResponse.Result.StatusCode != StatusCode.Success)
                {
                    context.Result = new JsonResult(new { StatusCode = HttpStatusCode.Unauthorized, Message = $"Missing Or Unsupported Token In Request Headers" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }

                return;
            }
        }
    }
}

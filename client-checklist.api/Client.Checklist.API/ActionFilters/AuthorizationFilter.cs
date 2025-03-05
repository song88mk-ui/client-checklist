using Client.Checklist.API.Controllers;
using Client.Checklist.Shared.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Client.Checklist.API.ActionFilters
{
    public class AuthorizationFilter : ActionFilterAttribute
    {
        private readonly string _apiKey;
        public AuthorizationFilter(IConfiguration configuration)
        {
            _apiKey = configuration["Custom:APIKey"];
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var apiKey = context.HttpContext.Request.Headers["x-api-key"].FirstOrDefault();

            if (string.IsNullOrEmpty(apiKey) || apiKey != _apiKey)
            {
                context.Result = new BadRequestObjectResult(new
                {
                    StatusCode = StatusCode.Missing_Or_Unsupported_APIKey_In_Request_Headers,
                    Message = StatusCode.Missing_Or_Unsupported_APIKey_In_Request_Headers.ToString().Replace('_', ' ')
                });
            }

            if (!string.IsNullOrEmpty(context.HttpContext.Request.Headers["x-client-token"].FirstOrDefault()))
            {
                ((BaseController)context.Controller).ClientView = true;
            }

        }
    }
}

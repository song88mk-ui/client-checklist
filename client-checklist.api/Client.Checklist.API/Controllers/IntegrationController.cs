using Client.Checklist.API.ActionFilters;
using Client.Checklist.API.Repository;
using Client.Checklist.Shared.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Client.Checklist.API.Controllers
{
    [Route("v1")]
    [ApiController, EnableCors("AllowAllOrigins"), ServiceFilter(typeof(AuthorizationFilter))]
    public class IntegrationController : BaseController
    {
        #region Fields

        private readonly IClientRepository _clientRepository;
        private readonly ILogger<IntegrationController> _logger;

        #endregion

        public IntegrationController(ILogger<IntegrationController> logger, IClientRepository clientRepository)
        {
            _logger = logger;
            _clientRepository = clientRepository;
        }

        #region Methods

        [HttpPost("users/login")]
        public async Task<IActionResult> Login([FromBody] LogInRequestDTO request)
        {
            // this endpoint will be called from User Agent, extract the original caller IP from the
            // following:
            //      cloudflare (ipv6) -> httpContext(xff) -> remoteIp (in that order)
            var cfConnectingIpv6 = HttpContext.Request.Headers["cf-connecting-ipv6"].FirstOrDefault();
            var xff = HttpContext.Request.Headers["x-forwarded-for"].FirstOrDefault();
            // xff can be a comma separated values being the first as the original requester
            var remoteIp = string.IsNullOrEmpty(xff) ?
                HttpContext.Connection.RemoteIpAddress.ToString() :
                xff.Split(",").First().Split(":").First();
            var ipAddress = !string.IsNullOrEmpty(cfConnectingIpv6) ? cfConnectingIpv6 : remoteIp;

            // inject the ip to the request so it can be processed downstream (eg. Auth-API)
            request.IpAddress = ipAddress;

            var result = await _clientRepository.Login(request);

            return ReturnResult(result);
        }

        [HttpPost("users/logout")]
        public async Task<IActionResult> Logout([FromBody] LogOutRequestDTO request)
        {
            var result = await _clientRepository.Logout(request);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpGet("clients/{clientId}")]
        public async Task<IActionResult> GetClientInformation([FromRoute] string clientId)
        {
            var result = await _clientRepository.GetClientInformation(clientId, ClientView);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpGet("clients")]
        public async Task<IActionResult> GetClientList()
        {
            var token = HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.GetClientList(token);

            return ReturnResult(result);
        }

        [Authorize("Admin")]
        [HttpPost("clients")]
        public async Task<IActionResult> CreateClient([FromBody] CreateClientRequestDTO request)
        {
            var token = HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.CreateClientInformation(request, token);

            return ReturnResult(result);
        }

        [Authorize("Admin")]
        [HttpPut("clients")]
        public async Task<IActionResult> UpdateClient([FromBody] UpdateClientRequestDTO request)
        {
            var token = HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.UpdateClientInformation(request, token);

            return ReturnResult(result);
        }

        [Authorize("Admin")]
        [HttpPut("clients/status")]
        public async Task<IActionResult> EnableDisableClient([FromBody] ClientStatusRequestDTO request)
        {
            var result = await _clientRepository.EnableDisableClient(request);

            return ReturnResult(result);
        }

        [Authorize("Admin")]
        [HttpPost("clients/steps")]
        public async Task<IActionResult> AddClientSteps([FromBody] AddClientStepsRequestDTO request)
        {
            var result = await _clientRepository.AddClientSteps(request);

            return ReturnResult(result);
        }

        [Authorize("Admin")]
        [HttpPut("clients/steps")]
        public async Task<IActionResult> UpdateClientTask([FromBody] UpdateClientStepsRequestDTO request)
        {
            var result = await _clientRepository.UpdateClientSteps(request);

            return ReturnResult(result);
        }

        #endregion

        #region Utilities

        private IActionResult ReturnResult<T>(BaseResponseDTO<T> result)
        {
            switch (result.StatusCode)
            {
                case Shared.Enums.StatusCode.Success:
                case Shared.Enums.StatusCode.Maintenance:
                    return Ok(result);
                default:
                    return BadRequest(result);
            }
        }

        private IActionResult ReturnResult(BaseResponse result)
        {
            switch (result.StatusCode)
            {
                case Shared.Enums.StatusCode.Success:
                case Shared.Enums.StatusCode.Maintenance:
                    return Ok(result);
                default:
                    return BadRequest(result);
            }
        }

        #endregion
    }
}

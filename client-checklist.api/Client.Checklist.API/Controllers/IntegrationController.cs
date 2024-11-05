using Client.Checklist.API.ActionFilters;
using Client.Checklist.API.Repository;
using Client.Checklist.Shared.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Client.Checklist.API.Controllers
{
    [Route("v1")]
    [ApiController, EnableCors("AllowAllOrigins"), ServiceFilter(typeof(AuthorizationFilter))]
    public class IntegrationController : ControllerBase
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
            var result = await _clientRepository.GetClientInformation(clientId);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpGet("clients")]
        public async Task<IActionResult> GetClientList()
        {
            var result = await _clientRepository.GetClientList();

            return ReturnResult(result);
        }

        [Authorize]
        [HttpPost("clients")]
        public async Task<IActionResult> CreateClient([FromBody] CreateOrUpdateClientRequestDTO request)
        {
            var result = await _clientRepository.CreateClientInformation(request);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpPut("clients")]
        public async Task<IActionResult> UpdateClient([FromBody] CreateOrUpdateClientRequestDTO request)
        {
            var result = await _clientRepository.UpdateClientInformation(request);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpDelete("clients")]
        public async Task<IActionResult> DeleteClient([FromBody] DeleteClientRequestDTO request)
        {
            var result = await _clientRepository.DeleteClientInformation(request);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpPost("clients/tasks")]
        public async Task<IActionResult> AddClientTask([FromBody] AddClientTaskRequestDTO request)
        {
            var result = await _clientRepository.AddClientTask(request);

            return ReturnResult(result);
        }

        [Authorize]
        [HttpPut("clients/tasks")]
        public async Task<IActionResult> UpdateClientTask([FromBody] UpdateClientTaskRequestDTO request)
        {
            var result = await _clientRepository.UpdateClientTask(request);

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

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
            var result = await _clientRepository.Login(request);

            return ReturnResult(result);
        }

        [HttpPost("users/logout")]
        public async Task<IActionResult> Logout([FromBody] LogOutRequestDTO request)
        {
            var result = await _clientRepository.Logout(request);

            return ReturnResult(result);
        }

        [HttpGet("clients/{clientId}")]
        public async Task<IActionResult> GetClientInformation([FromRoute] string clientId)
        {
            var token = HttpContext.Request.Headers["x-client-token"].FirstOrDefault() ?? HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.GetClientInformation(clientId, token);

            return ReturnResult(result);
        }

        [HttpGet("clients")]
        public async Task<IActionResult> GetClientList()
        {
            var userToken = HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.GetClientList(userToken);

            return ReturnResult(result);
        }

        [HttpPost("clients")]
        public async Task<IActionResult> CreateOrUpdateClient([FromBody] CreateOrUpdateClientRequestDTO request)
        {
            var userToken = HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.CreateOrUpdateClientInformation(request, userToken);

            return ReturnResult(result);
        }

        [HttpDelete("clients")]
        public async Task<IActionResult> DeleteClient([FromBody] DeleteClientRequestDTO request)
        {
            var userToken = HttpContext.Request.Headers["x-user-token"].FirstOrDefault();

            var result = await _clientRepository.DeleteClientInformation(request, userToken);

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

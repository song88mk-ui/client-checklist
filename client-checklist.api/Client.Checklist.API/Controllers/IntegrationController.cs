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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogInRequestDTO request)
        {
            var result = await _clientRepository.Login(request);

            return ReturnResult(result);
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Authenticate([FromBody] AuthRequestDTO request)
        {
            var result = await _clientRepository.Authenticate(request);

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

        #endregion
    }
}

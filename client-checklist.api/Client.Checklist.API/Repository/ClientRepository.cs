using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;

namespace Client.Checklist.API.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public ClientRepository(IConfiguration configuration, IAuthRepository authRepository)
        {
            _configuration = configuration;
            _authRepository = authRepository;
        }

        public async Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInDTO request)
        {
            try
            {
                var response = await _authRepository.Login(new LogInModel
                {
                    Username = request.Username,
                    Password = request.Password,
                    Provider = $"{(int)Application.ClientChecklist}"
                });

                if (response.StatusCode == StatusCode.Success)
                {
                    var handler = new JwtSecurityTokenHandler();

                    var jwtToken = handler.ReadJwtToken(response.Result.AccessToken);

                    return new BaseResponseDTO<LoginResponseDTO>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = new LoginResponseDTO
                        {
                            OperatorToken = response.Result.OperatorToken,
                            RoleName = jwtToken.Claims.FirstOrDefault(c => c.Type == "RoleName")?.Value ?? string.Empty
                        }
                    };
                }
                else
                {
                    return new BaseResponseDTO<LoginResponseDTO>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"({response.StatusCode}) - {response.Message}"
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<LoginResponseDTO>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponseDTO<object>> GetClient(string request)
        {
            try
            {
                //TODO: get client by token
                return new BaseResponseDTO<object>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}"
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<object>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }


    }
}

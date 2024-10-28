using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace Client.Checklist.API.Repository
{
    public class ClientRepository : IClientRepository
    {
        #region Fields

        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        #endregion

        #region Ctor

        public ClientRepository(IConfiguration configuration, IAuthRepository authRepository)
        {
            _configuration = configuration;
            _authRepository = authRepository;
        }

        #endregion

        #region Methods

        public async Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request)
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

        public async Task<BaseResponseDTO<AuthResponseDTO>> Authenticate(AuthRequestDTO request)
        {
            try
            {
                var response = await _authRepository.Authenticate(request.UserToken);

                if (response.StatusCode == StatusCode.Success)
                {
                    return new BaseResponseDTO<AuthResponseDTO>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = new AuthResponseDTO
                        {
                            UserId = response.Result.UserId,
                            Name = response.Result.NickName,
                        }
                    };
                }
                else
                {
                    return new BaseResponseDTO<AuthResponseDTO>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{response.StatusCode} - {response.Message}"
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<AuthResponseDTO>
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

        #endregion

        #region Utilities

        //private string GenerateJwtToken(string secretKey, string issuer, List<Claim> claims)
        //{
        //    // Generate the signing key
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        //    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            
        //    // Create the token
        //    var token = new JwtSecurityToken(
        //        issuer: issuer,
        //        audience: issuer,
        //        claims: claims,
        //        expires: DateTime.MaxValue,
        //        signingCredentials: credentials
        //    );

        //    // Return the JWT token string
        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        #endregion
    }
}

using Client.Checklist.Shared.Data.ClientChecklist;
using Client.Checklist.Shared.Data.ClientChecklist.Entities;
using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace Client.Checklist.API.Repository
{
    public class ClientRepository : IClientRepository
    {
        #region Fields

        private readonly ClientChecklistContext _clientChecklistContext;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        #endregion

        #region Ctor

        public ClientRepository(ClientChecklistContext clientChecklistContext, IConfiguration configuration, IAuthRepository authRepository)
        {
            _clientChecklistContext = clientChecklistContext;
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

                    var roleName = jwtToken.Claims.FirstOrDefault(c => c.Type == "RoleName")?.Value;

                    return new BaseResponseDTO<LoginResponseDTO>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = new LoginResponseDTO
                        {
                            UserToken = response.Result.OperatorToken,
                            RoleName = "Admin",
                            AccessType = roleName?.Contains("Super Admin") ?? false ? (int)AccessType.ReadAndWrite : (int)AccessType.ReadOnly
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

        public async Task<BaseResponse> Logout(LogOutRequestDTO request)
        {
            try
            {
                var response = await _authRepository.Logout(request.UserToken);

                if (response.StatusCode == StatusCode.Success)
                {
                    return new BaseResponse
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}"
                    };
                }
                else
                {
                    return new BaseResponse
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"({response.StatusCode}) - {response.Message}"
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponse
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

        public async Task<BaseResponseDTO<ClientInformationModel>> GetClientInformation(string clientId, string token)
        {
            try
            {
                var authResponse = await _authRepository.Authenticate(token);

                if(authResponse.StatusCode != StatusCode.Success)
                {
                    return new BaseResponseDTO<ClientInformationModel>
                    {
                        StatusCode = StatusCode.Missing_Or_Unsupported_OperatorToken_In_Request_Headers,
                        Message = $"Missing Or Unsupported Client Token In Request Headers"
                    };
                }

                Guid.TryParse(clientId, out var clientGuid);

                var client = _clientChecklistContext.ClientInformation.AsNoTracking().FirstOrDefault(f => f.ClientId == clientGuid && f.IsDeleted == false);

                if(client == null)
                {
                    return new BaseResponseDTO<ClientInformationModel>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Client Not Found"
                    };
                }

                return new BaseResponseDTO<ClientInformationModel>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}",
                    Result = new ClientInformationModel
                    {
                        ClientId = client.ClientId.ToString(),
                        ClientName = client.ClientName,
                        CustomerServiceManager = client.CustomerServiceManager,
                        Domain = client.Domain,
                        CustomerServiceManagerContact = client.CustomerServiceManagerContact,
                        FinanceManager = client.FinanceManager,
                        FinanceManagerContact = client.FinanceManagerContact,
                        MainDecisionMaker = client.MainDecisionMaker,
                        MainDecisionMakerContact = client.MainDecisionMakerContact,
                        ProductManager = client.ProductManager,
                        ProductManagerContact = client.ProductManagerContact,
                        ServiceTypeId = client.ServiceTypeId,
                        SSLCertificate = client.SSLCertificate,
                        SupportedCurrency = client.SupportedCurrency,
                        SupportedLanguage = client.SupportedLanguage,
                        TargetLaunchDate = client.TargetLaunchDate,
                        TechnicalManager = client.TechnicalManager,
                        TechnicalManagerContact = client.TechnicalManagerContact,
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<ClientInformationModel>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList(string userToken)
        {
            try
            {
                var authResponse = await _authRepository.Authenticate(userToken);

                if (authResponse.StatusCode != StatusCode.Success)
                {
                    return new BaseResponseDTO<ClientInformationListDTO>
                    {
                        StatusCode = StatusCode.Missing_Or_Unsupported_OperatorToken_In_Request_Headers,
                        Message = $"Missing Or Unsupported User Token In Request Headers"
                    };
                }

                var clients = _clientChecklistContext.ClientInformation.AsNoTracking().Where(c => c.IsDeleted == false).ToList();

                return new BaseResponseDTO<ClientInformationListDTO>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}",
                    Result = new ClientInformationListDTO
                    {
                        Clients = clients.Select(s => new ClientInformationModel
                        {
                            ClientId = s.ClientId.ToString(),
                            ClientName = s.ClientName,
                            CustomerServiceManager = s.CustomerServiceManager,
                            Domain = s.Domain,
                            CustomerServiceManagerContact = s.CustomerServiceManagerContact,
                            FinanceManager = s.FinanceManager,
                            FinanceManagerContact = s.FinanceManagerContact,
                            MainDecisionMaker = s.MainDecisionMaker,
                            MainDecisionMakerContact = s.MainDecisionMakerContact,
                            ProductManager = s.ProductManager,
                            ProductManagerContact = s.ProductManagerContact,
                            ServiceTypeId = s.ServiceTypeId,
                            SSLCertificate = s.SSLCertificate,
                            SupportedCurrency = s.SupportedCurrency,
                            SupportedLanguage = s.SupportedLanguage,
                            TargetLaunchDate = s.TargetLaunchDate,
                            TechnicalManager = s.TechnicalManager,
                            TechnicalManagerContact = s.TechnicalManagerContact,
                        }).ToList()
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<ClientInformationListDTO>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponseDTO<string>> CreateOrUpdateClientInformation(CreateOrUpdateClientRequestDTO request, string userToken)
        {
            try
            {
                var authResponse = await _authRepository.Authenticate(userToken);

                if (authResponse.StatusCode != StatusCode.Success)
                {
                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Missing_Or_Unsupported_OperatorToken_In_Request_Headers,
                        Message = $"Missing Or Unsupported User Token In Request Headers"
                    };
                }

                var clientId = Guid.NewGuid();
                if (Guid.TryParse(request.ClientId, out Guid result))
                    clientId = result;

                var client = await _clientChecklistContext.ClientInformation.FindAsync(clientId);

                if (client == null)
                {
                    var entity = _clientChecklistContext.ClientInformation.Add(new ClientInformation
                    {
                        ClientId = clientId,
                        ClientName = request.ClientName,
                        CustomerServiceManager = request.CustomerServiceManager,
                        CustomerServiceManagerContact = request.CustomerServiceManagerContact,
                        FinanceManager = request.FinanceManager,
                        FinanceManagerContact = request.FinanceManagerContact,
                        MainDecisionMaker = request.MainDecisionMaker,
                        MainDecisionMakerContact = request.MainDecisionMakerContact,
                        ProductManager = request.ProductManager,
                        ProductManagerContact = request.ProductManagerContact,
                        Domain = request.Domain,
                        SSLCertificate = request.SSLCertificate,
                        ServiceTypeId = request.ServiceTypeId,
                        SupportedCurrency = request.SupportedCurrency,
                        SupportedLanguage = request.SupportedLanguage,
                        TechnicalManager = request.TechnicalManager,
                        TechnicalManagerContact = request.TechnicalManagerContact,
                        TargetLaunchDate = request.TargetLaunchDate,
                    });

                }
                else
                {
                    client.ClientName = request.ClientName;
                    client.CustomerServiceManager = request.CustomerServiceManager;
                    client.CustomerServiceManagerContact = request.CustomerServiceManagerContact;
                    client.FinanceManager = request.FinanceManager;
                    client.FinanceManagerContact = request.FinanceManagerContact;
                    client.MainDecisionMaker = request.MainDecisionMaker;
                    client.MainDecisionMakerContact = request.MainDecisionMakerContact;
                    client.ProductManager = request.ProductManager;
                    client.ProductManagerContact = request.ProductManagerContact;
                    client.Domain = request.Domain;
                    client.SSLCertificate = request.SSLCertificate;
                    client.ServiceTypeId = request.ServiceTypeId;
                    client.SupportedCurrency = request.SupportedCurrency;
                    client.SupportedLanguage = request.SupportedLanguage;
                    client.TechnicalManager = request.TechnicalManager;
                    client.TechnicalManagerContact = request.TechnicalManagerContact;
                    client.TargetLaunchDate = request.TargetLaunchDate;
                }

                _clientChecklistContext.SaveChanges();

                var token = await _authRepository.CreateClientToken(new CreateClientTokenRequestDTO
                {
                    ClientId = clientId.ToString(),
                    ClientName = request.ClientName
                });

                return new BaseResponseDTO<string>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}",
                    Result = token.Result
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<string>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponse> DeleteClientInformation(DeleteClientRequestDTO request, string userToken)
        {
            try
            {
                var authResponse = await _authRepository.Authenticate(userToken);

                if (authResponse.StatusCode != StatusCode.Success)
                {
                    return new BaseResponseDTO<ClientInformationListDTO>
                    {
                        StatusCode = StatusCode.Missing_Or_Unsupported_OperatorToken_In_Request_Headers,
                        Message = $"Missing Or Unsupported User Token In Request Headers"
                    };
                }

                var clientId = Guid.Parse(request.ClientId);

                var client = await _clientChecklistContext.ClientInformation.FindAsync(clientId);

                if (client == null)
                {
                    return new BaseResponse
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Client Not Found"
                    };
                }
                else
                {
                    client.IsDeleted = true;
                }

                _clientChecklistContext.SaveChanges();

                return new BaseResponse
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

        #endregion
    }
}

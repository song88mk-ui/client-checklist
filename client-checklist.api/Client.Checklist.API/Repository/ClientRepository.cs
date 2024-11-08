using Client.Checklist.API.Telemetry;
using Client.Checklist.Shared.Data.ClientChecklist;
using Client.Checklist.Shared.Data.ClientChecklist.Entities;
using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Diagnostics;
using System.Text.Json;

namespace Client.Checklist.API.Repository
{
    public class ClientRepository : IClientRepository
    {
        #region Fields

        private readonly ClientChecklistContext _clientChecklistContext;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly ActivitySource _activitySource;

        #endregion

        #region Ctor

        public ClientRepository(ClientChecklistContext clientChecklistContext, IConfiguration configuration, IAuthRepository authRepository, Instrumentation instrumentation)
        {
            _clientChecklistContext = clientChecklistContext;
            _configuration = configuration;
            _authRepository = authRepository;
            _activitySource = instrumentation.ActivitySource;
        }

        #endregion

        #region Methods

        public async Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request)
        {
            using(var activity = _activitySource.StartActivity("client.login"))
            {
                try
                {
                    activity?.SetTag("user.name", request.Username);
                    activity?.SetTag("ip.address", request.IpAddress);
                    activity?.SetTag("provider", Application.ClientChecklist);

                    var response = await _authRepository.Login(new LogInModel
                    {
                        Username = request.Username,
                        Password = request.Password,
                        IpAddress = request.IpAddress,
                        Provider = $"{(int)Application.ClientChecklist}"
                    });

                    activity?.SetTag("http.status.code", response.StatusCode);
                    if (response.StatusCode == StatusCode.Success)
                    {
                        var handler = new JwtSecurityTokenHandler();

                        var jwtToken = handler.ReadJwtToken(response.Result.AccessToken);

                        var roleName = jwtToken.Claims.FirstOrDefault(c => c.Type == "RoleName")?.Value;

                        activity?.SetStatus(ActivityStatusCode.Ok);
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
                        activity?.SetStatus(ActivityStatusCode.Error, StatusCode.Error.ToString());
                        return new BaseResponseDTO<LoginResponseDTO>
                        {
                            StatusCode = StatusCode.Error,
                            Message = $"({response.StatusCode}) - {response.Message}"
                        };
                    }
                }
                catch (Exception ex)
                {
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
                    return new BaseResponseDTO<LoginResponseDTO>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
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

        public async Task<BaseResponseDTO<ClientInformationResponseDTO>> GetClientInformation(string clientId)
        {
            try
            {
                Guid.TryParse(clientId, out var clientGuid);

                var client = _clientChecklistContext.ClientInformation.AsNoTracking().FirstOrDefault(f => f.ClientId == clientGuid && f.IsDeleted == false);

                if (client == null)
                {
                    return new BaseResponseDTO<ClientInformationResponseDTO>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Client Not Found"
                    };
                }

                var clientTasks = _clientChecklistContext.ClientTask.AsNoTracking().Where(c => c.ClientId == client.ClientId)
                    .Select(s => new ClientTaskModel
                    {

                        AssignedTo = s.AssignedTo,
                        ClientId = s.ClientId,
                        TaskId = s.TaskId,
                        TaskName = s.TaskName,
                        ServiceTypeId = s.ServiceTypeId,
                        ActualDateCompleted = s.TargetDateCompleted,
                        TargetDateCompleted = s.ActualDateCompleted,
                        Environment = s.Environment,
                        SortOrder = s.SortOrder
                    }).ToList();

                foreach (var task in clientTasks)
                {
                    var clientSubtasks = _clientChecklistContext.ClientSubtask.AsNoTracking().Where(c => c.ClientTaskId == task.ClientTaskId).Select(cs => new ClientSubtaskModel
                    {
                        SubtaskId = cs.SubtaskId,
                        SubtaskName = cs.SubtaskName,
                        TaskStatusId = cs.TaskStatusId,
                        ClientTaskStatusId = cs.ClientTaskStatusId,
                        Comment = cs.Comment,
                        SortOrder = cs.SortOrder
                    }).ToList();

                    task.ClientSubtasks.AddRange(clientSubtasks);
                }

                var currencies = string.IsNullOrEmpty(client.SupportedCurrency) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(client.SupportedCurrency);
                var languages = string.IsNullOrEmpty(client.SupportedLanguage) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(client.SupportedLanguage);

                return new BaseResponseDTO<ClientInformationResponseDTO>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}",
                    Result = new ClientInformationResponseDTO
                    {
                        Client = new ClientInformationModel
                        {
                            ClientId = client.ClientId.ToString(),
                            ClientName = client.ClientName,
                            Domain = client.Domain,
                            CustomerServiceManager = new Manager { Name = client.CustomerServiceManager, Number = client.CustomerServiceManagerContact },
                            FinanceManager = new Manager { Name = client.FinanceManager, Number = client.FinanceManagerContact },
                            MainDecisionMaker = new Manager { Name = client.MainDecisionMaker, Number = client.MainDecisionMakerContact },
                            ProductManager = new Manager { Name = client.ProductManager, Number = client.ProductManagerContact },
                            TechnicalManager = new Manager { Name = client.TechnicalManager, Number = client.TechnicalManagerContact },
                            ServiceTypeId = client.ServiceTypeId,
                            SSLCertificate = client.SSLCertificate,
                            Currencies = currencies,
                            Languages = languages,
                            TargetLaunchDate = client.TargetLaunchDate
                        },
                        ClientTasks = clientTasks
                    }
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<ClientInformationResponseDTO>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList()
        {
            try
            {
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
                            Domain = s.Domain,
                            ServiceTypeId = s.ServiceTypeId,
                            SSLCertificate = s.SSLCertificate,
                            CustomerServiceManager = new Manager { Name = s.CustomerServiceManager, Number = s.CustomerServiceManagerContact },
                            FinanceManager = new Manager { Name = s.FinanceManager, Number = s.FinanceManagerContact },
                            MainDecisionMaker = new Manager { Name = s.MainDecisionMaker, Number = s.MainDecisionMakerContact },
                            ProductManager = new Manager { Name = s.ProductManager, Number = s.ProductManagerContact },
                            TechnicalManager = new Manager { Name = s.TechnicalManager, Number = s.TechnicalManagerContact },
                            Currencies = string.IsNullOrEmpty(s.SupportedCurrency) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(s.SupportedCurrency) ?? new List<string>(),
                            Languages = string.IsNullOrEmpty(s.SupportedLanguage) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(s.SupportedLanguage) ?? new List<string>(),
                            TargetLaunchDate = s.TargetLaunchDate,
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

        public async Task<BaseResponseDTO<string>> CreateClientInformation(CreateOrUpdateClientRequestDTO request)
        {
            try
            {
                var client = _clientChecklistContext.ClientInformation.Add(new ClientInformation
                {
                    ClientName = request.ClientName,
                    CustomerServiceManager = request.CustomerServiceManager.Name,
                    CustomerServiceManagerContact = request.CustomerServiceManager.Number,
                    FinanceManager = request.FinanceManager.Name,
                    FinanceManagerContact = request.FinanceManager.Number,
                    MainDecisionMaker = request.MainDecisionMaker.Name,
                    MainDecisionMakerContact = request.MainDecisionMaker.Number,
                    ProductManager = request.ProductManager.Name,
                    ProductManagerContact = request.ProductManager.Number,
                    Domain = request.Domain,
                    SSLCertificate = request.SSLCert,
                    ServiceTypeId = request.ServiceTypeId,
                    SupportedCurrency = request.Currencies.Any() ? string.Join(",", request.Currencies) : string.Empty,
                    SupportedLanguage = request.Languages.Any() ? string.Join(",", request.Languages) : string.Empty,
                    TechnicalManager = request.TechnicalManager.Name,
                    TechnicalManagerContact = request.TechnicalManager.Number,
                    TargetLaunchDate = request.LaunchDate,
                }).Entity;

                _clientChecklistContext.SaveChanges();

                var token = await _authRepository.CreateClientToken(new CreateClientTokenRequestDTO
                {
                    ClientId = client.ClientId.ToString(),
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

        public async Task<BaseResponseDTO<string>> UpdateClientInformation(CreateOrUpdateClientRequestDTO request)
        {
            try
            {
                if (!Guid.TryParse(request.ClientId, out Guid result))
                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Invalid Client ID"
                    };

                var client = await _clientChecklistContext.ClientInformation.FindAsync(result);

                if (client == null)
                {
                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Client Not Found"
                    };
                }
                else
                {
                    client.ClientName = request.ClientName;
                    client.CustomerServiceManager = request.CustomerServiceManager.Name;
                    client.CustomerServiceManagerContact = request.CustomerServiceManager.Number;
                    client.FinanceManager = request.FinanceManager.Name;
                    client.FinanceManagerContact = request.FinanceManager.Number;
                    client.MainDecisionMaker = request.MainDecisionMaker.Name;
                    client.MainDecisionMakerContact = request.MainDecisionMaker.Number;
                    client.ProductManager = request.ProductManager.Name;
                    client.ProductManagerContact = request.ProductManager.Number;
                    client.Domain = request.Domain;
                    client.SSLCertificate = request.SSLCert;
                    client.ServiceTypeId = request.ServiceTypeId;
                    client.SupportedCurrency = request.Currencies.Any() ? string.Join(",", request.Currencies) : string.Empty;
                    client.SupportedLanguage = request.Languages.Any() ? string.Join(",", request.Languages) : string.Empty;
                    client.TechnicalManager = request.TechnicalManager.Name;
                    client.TechnicalManagerContact = request.TechnicalManager.Number;
                    client.TargetLaunchDate = request.LaunchDate;
                }

                _clientChecklistContext.SaveChanges();

                var token = await _authRepository.CreateClientToken(new CreateClientTokenRequestDTO
                {
                    ClientId = result.ToString(),
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

        public async Task<BaseResponse> DeleteClientInformation(DeleteClientRequestDTO request)
        {
            try
            {
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

        public async Task<BaseResponseDTO<bool>> AddClientTask(AddClientTaskRequestDTO request)
        {
            try
            {
                var clientId = Guid.Parse(request.ClientId);

                var task = _clientChecklistContext.ClientTask.Add(new ClientTask
                {
                    ClientId = clientId,
                    TaskId = request.TaskId,
                    TaskName = request.TaskName,
                    ServiceTypeId = request.ServiceTypeId,
                    Environment = request.Environment,
                    TargetDateCompleted = string.IsNullOrEmpty(request.TargetDateCompleted) ? null : Convert.ToDateTime(request.TargetDateCompleted),
                    ActualDateCompleted = string.IsNullOrEmpty(request.ActualDateCompleted) ? null : Convert.ToDateTime(request.ActualDateCompleted),
                    AssignedTo = request.AssignedTo,
                    SortOrder = request.SortOrder,
                }).Entity;

                _clientChecklistContext.SaveChanges();

                foreach (var subTask in request.SubTasks)
                {
                    _clientChecklistContext.ClientSubtask.Add(new ClientSubtask
                    {
                        ClientTaskId = task.ClientTaskId,
                        SubtaskId = subTask.SubtaskId,
                        SubtaskName = subTask.SubtaskName,
                        Comment = subTask.Comment,
                        TaskStatusId = subTask.TaskStatusId,
                        ClientTaskStatusId = subTask.ClientTaskStatusId,
                        SortOrder = subTask.SortOrder,
                    });
                }

                _clientChecklistContext.SaveChanges();

                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}",
                    Result = true
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponseDTO<bool>> UpdateClientTask(UpdateClientTaskRequestDTO request)
        {
            try
            {
                var clientTask = await _clientChecklistContext.ClientTask.FindAsync(request.ClientTaskId);

                if (clientTask == null)
                    return new BaseResponseDTO<bool>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Client Task Not Found",
                        Result = false
                    };
                else
                {
                    var clientId = Guid.Parse(request.ClientId);

                    clientTask.ServiceTypeId = request.ServiceTypeId;
                    clientTask.Environment = request.Environment;
                    clientTask.TargetDateCompleted = string.IsNullOrEmpty(request.TargetDateCompleted) ? null : Convert.ToDateTime(request.TargetDateCompleted);
                    clientTask.ActualDateCompleted = string.IsNullOrEmpty(request.ActualDateCompleted) ? null : Convert.ToDateTime(request.ActualDateCompleted);
                    clientTask.AssignedTo = request.AssignedTo;
                    clientTask.SortOrder = request.SortOrder;

                    _clientChecklistContext.SaveChanges();

                    var clientSubtasks = _clientChecklistContext.ClientSubtask.Where(c => c.ClientTaskId == clientTask.ClientTaskId);
                    if (clientSubtasks.Any())
                        _clientChecklistContext.ClientSubtask.RemoveRange(clientSubtasks);

                    foreach (var subTask in request.SubTasks)
                    {
                        _clientChecklistContext.ClientSubtask.Add(new ClientSubtask
                        {
                            ClientTaskId = clientTask.ClientTaskId,
                            SubtaskId = subTask.SubtaskId,
                            SubtaskName = subTask.SubtaskName,
                            Comment = subTask.Comment,
                            TaskStatusId = subTask.TaskStatusId,
                            ClientTaskStatusId = subTask.ClientTaskStatusId,
                            SortOrder = subTask.SortOrder,
                        });
                    }

                    _clientChecklistContext.SaveChanges();

                    return new BaseResponseDTO<bool>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<bool>
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

using Client.Checklist.API.Telemetry;
using Client.Checklist.Shared.Data.ClientChecklist;
using Client.Checklist.Shared.Data.ClientChecklist.Entities;
using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Diagnostics;
using System.Text.Json;
using TaskStatus = Client.Checklist.Shared.Enums.TaskStatus;
using Environment = Client.Checklist.Shared.Enums.Environment;

namespace Client.Checklist.API.Repository
{
    public class ClientRepository : IClientRepository
    {
        #region Fields

        private readonly ClientChecklistContext _clientChecklistContext;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly ActivitySource _activitySource;
        private CompositeValidator _compositeValidator;


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
            using (var activity = _activitySource.StartActivity("client.login"))
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
                                AccessType = roleName?.Contains("Super Admin") ?? false ? AccessType.ReadAndWrite : AccessType.ReadOnly
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

        public async Task<BaseResponseDTO<ClientInformationResponseDTO>> GetClientInformation(string clientId, bool clientView)
        {
            try
            {
                Guid.TryParse(clientId, out var clientGuid);

                var client = _clientChecklistContext.ClientInformation.AsNoTracking().FirstOrDefault(f => f.ClientId == clientGuid);

                if (client == null || (client.IsDeleted && clientView))
                {
                    return new BaseResponseDTO<ClientInformationResponseDTO>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"Client Not Found"
                    };
                }

                var clientSteps = _clientChecklistContext.ClientSteps.AsNoTracking().Where(c => c.ClientId == client.ClientId)
                    .Select(s => new ClientStepModel
                    {
                        ClientStepId = s.ClientStepId,
                        AssignedTo = s.AssignedTo,
                        ClientId = s.ClientId,
                        Step = (Steps)s.StepId,
                        StepName = s.StepName,
                        ServiceType = (ServiceType)s.ServiceTypeId,
                        ActualDateCompleted = s.ActualDateCompleted,
                        TargetDateCompleted = s.TargetDateCompleted,
                        Environment = (Environment)s.Environment,
                        SortOrder = s.SortOrder
                    }).ToList();

                foreach (var task in clientSteps)
                {
                    var clientSubtasks = _clientChecklistContext.ClientSubtask.AsNoTracking().Where(c => c.ClientStepId == task.ClientStepId)
                        .OrderBy(o => o.SortOrder).Select(cs => new ClientSubtaskModel
                        {
                            SubtaskId = cs.SubtaskId,
                            SubtaskName = cs.SubtaskName,
                            TaskStatus = (TaskStatus)cs.TaskStatusId,
                            Comment = cs.Comment
                        }).ToList();

                    task.ClientSubtasks.AddRange(clientSubtasks);
                }

                var currencies = string.IsNullOrEmpty(client.SupportedCurrency) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(client.SupportedCurrency);
                var languages = string.IsNullOrEmpty(client.SupportedLanguage) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(client.SupportedLanguage);
                var sports = string.IsNullOrEmpty(client.SupportedSports) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(client.SupportedSports) ?? new List<string>();
                var markets = string.IsNullOrEmpty(client.TargetMarkets) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(client.TargetMarkets) ?? new List<string>();

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
                            AccountManager = new Manager { Name = client.AccountManager, Number = client.AccountManagerContact },
                            SocialAccount = client.SocialAccount,
                            ServiceTypeId = client.ServiceTypeId,
                            TaskStatus = client.TaskStatus,
                            SSLCertificate = client.SSLCertificate,
                            Currencies = currencies,
                            Languages = languages,
                            Sports = sports,
                            Markets = markets,
                            TargetLaunchDate = client.TargetLaunchDate,
                            IsActive = !client.IsDeleted
                        },
                        ClientSteps = clientSteps
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

        public async Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList(string userToken)
        {
            try
            {
                var clientTokens = (await _authRepository.GetClientToken(userToken)).Result;

                var clients = _clientChecklistContext.ClientInformation.AsNoTracking().ToList();

                var clientSteps = _clientChecklistContext.ClientSteps.AsNoTracking().ToList();

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
                            AccountManager = new Manager { Name = s.AccountManager, Number = s.AccountManagerContact},
                            SocialAccount = s.SocialAccount,
                            Currencies = string.IsNullOrEmpty(s.SupportedCurrency) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(s.SupportedCurrency) ?? new List<string>(),
                            Languages = string.IsNullOrEmpty(s.SupportedLanguage) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(s.SupportedLanguage) ?? new List<string>(),
                            Sports = string.IsNullOrEmpty(s.SupportedSports) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(s.SupportedSports) ?? new List<string>(),
                            Markets = string.IsNullOrEmpty(s.TargetMarkets) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(s.TargetMarkets) ?? new List<string>(),
                            TargetLaunchDate = s.TargetLaunchDate,
                            TaskStatus = s.TaskStatus,
                            ClientToken = clientTokens?.FirstOrDefault(f => f.UserId.ToUpper() == s.ClientId.ToString().ToUpper())?.OperatorToken ?? string.Empty,
                            IsActive = !s.IsDeleted,
                            RegisteredStepsCount = clientSteps.Where(c => c.ClientId == s.ClientId).ToList().Count(),
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

        public async Task<BaseResponseDTO<string>> CreateClientInformation(CreateClientRequestDTO request, string userToken)
        {
            using (var activity = _activitySource.StartActivity("create.client"))
            {
                try
                {
                    activity?.SetTag("request", JsonSerializer.Serialize(request));

                    var validators = new List<IRequestValidator>
                    {
                        new ServiceTypeValidator(request.ServiceTypeId)
                    };

                    _compositeValidator = new CompositeValidator(validators);

                    var validate = _compositeValidator.Validate();
                    if (validate.StatusCode != StatusCode.Success)
                    {
                        activity?.SetStatus(ActivityStatusCode.Error, validate.Message);

                        return new BaseResponseDTO<string>
                        {
                            StatusCode = StatusCode.Error,
                            Message = validate.Message
                        };
                    }

                    var client = _clientChecklistContext.ClientInformation.Add(new ClientInformation
                    {
                        ClientName = request.ClientName,
                        CustomerServiceManager = request.CustomerServiceManager?.Name ?? string.Empty,
                        CustomerServiceManagerContact = request.CustomerServiceManager?.Number ?? string.Empty,
                        FinanceManager = request.FinanceManager?.Name ?? string.Empty,
                        FinanceManagerContact = request.FinanceManager?.Number ?? string.Empty,
                        MainDecisionMaker = request.MainDecisionMaker?.Name ?? string.Empty,
                        MainDecisionMakerContact = request.MainDecisionMaker?.Number ?? string.Empty,
                        ProductManager = request.ProductManager?.Name ?? string.Empty,
                        ProductManagerContact = request.ProductManager?.Number ?? string.Empty,
                        AccountManager = request.AccountManager?.Name ?? string.Empty,
                        AccountManagerContact = request.AccountManager?.Number ?? string.Empty,
                        SocialAccount = request.SocialAccount ?? string.Empty,
                        Domain = request.Domain ?? string.Empty,
                        SSLCertificate = request.SSLCert ?? string.Empty,
                        ServiceTypeId = request.ServiceTypeId,
                        SupportedCurrency = request.Currencies.Any() ? JsonSerializer.Serialize(request.Currencies) : string.Empty,
                        SupportedLanguage = request.Languages.Any() ? JsonSerializer.Serialize(request.Languages) : string.Empty,
                        TechnicalManager = request.TechnicalManager?.Name ?? string.Empty,
                        TechnicalManagerContact = request.TechnicalManager?.Number ?? string.Empty,
                        TargetLaunchDate = request.LaunchDate,
                        SupportedSports = request.Sports.Any() ? JsonSerializer.Serialize(request.Sports) : string.Empty,
                        TargetMarkets = request.Markets.Any() ? JsonSerializer.Serialize(request.Markets) : string.Empty,
                        TaskStatus = (int)TaskStatus.NotStarted,
                    }).Entity;

                    _clientChecklistContext.SaveChanges();

                    var token = await _authRepository.CreateClientToken(new CreateClientTokenRequestDTO
                    {
                        ClientId = client.ClientId.ToString(),
                        ClientName = request.ClientName
                    }, userToken);

                    activity?.SetStatus(ActivityStatusCode.Ok);

                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = client.ClientId.ToString().ToUpper()
                    };
                }
                catch (Exception ex)
                {
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);

                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
            }
        }

        public async Task<BaseResponseDTO<string>> UpdateClientInformation(UpdateClientRequestDTO request, string userToken)
        {
            using (var activity = _activitySource.StartActivity("update.client"))
            {
                try
                {
                    activity?.SetTag("request", JsonSerializer.Serialize(request));

                    var validators = new List<IRequestValidator>
                    {
                        new ClientIdValidator(request.ClientId),
                        new ServiceTypeValidator(request.ServiceTypeId)
                    };

                    _compositeValidator = new CompositeValidator(validators);

                    var validate = _compositeValidator.Validate();
                    if (validate.StatusCode != StatusCode.Success)
                    {
                        activity?.SetStatus(ActivityStatusCode.Error, validate.Message);

                        return new BaseResponseDTO<string>
                        {
                            StatusCode = StatusCode.Error,
                            Message = validate.Message
                        };
                    }

                    var client = await _clientChecklistContext.ClientInformation.FindAsync(Guid.Parse(request.ClientId));

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
                        client.CustomerServiceManager = request.CustomerServiceManager?.Name ?? string.Empty;
                        client.CustomerServiceManagerContact = request.CustomerServiceManager?.Number ?? string.Empty;
                        client.FinanceManager = request.FinanceManager?.Name ?? string.Empty;
                        client.FinanceManagerContact = request.FinanceManager?.Number ?? string.Empty;
                        client.MainDecisionMaker = request.MainDecisionMaker?.Name ?? string.Empty;
                        client.MainDecisionMakerContact = request.MainDecisionMaker?.Number ?? string.Empty;
                        client.ProductManager = request.ProductManager?.Name ?? string.Empty;
                        client.ProductManagerContact = request.ProductManager?.Number ?? string.Empty;
                        client.AccountManager = request.AccountManager?.Name ?? string.Empty;
                        client.AccountManagerContact = request.AccountManager?.Number ?? string.Empty;
                        client.SocialAccount = request.SocialAccount ?? string.Empty;
                        client.Domain = request.Domain ?? string.Empty;
                        client.SSLCertificate = request.SSLCert ?? string.Empty;
                        client.ServiceTypeId = request.ServiceTypeId;
                        client.SupportedCurrency = request.Currencies.Any() ? JsonSerializer.Serialize(request.Currencies) : string.Empty;
                        client.SupportedLanguage = request.Languages.Any() ? JsonSerializer.Serialize(request.Languages) : string.Empty;
                        client.TechnicalManager = request.TechnicalManager?.Name ?? string.Empty;
                        client.TechnicalManagerContact = request.TechnicalManager?.Number ?? string.Empty;
                        client.TargetLaunchDate = request.LaunchDate;
                        client.SupportedSports = request.Sports.Any() ? JsonSerializer.Serialize(request.Sports) : string.Empty;
                        client.TargetMarkets = request.Markets.Any() ? JsonSerializer.Serialize(request.Markets) : string.Empty;
                        client.TaskStatus = request.TaskStatus;
                    }

                    _clientChecklistContext.SaveChanges();

                    var token = await _authRepository.CreateClientToken(new CreateClientTokenRequestDTO
                    {
                        ClientId = client.ClientId.ToString(),
                        ClientName = request.ClientName
                    }, userToken);

                    activity?.SetStatus(ActivityStatusCode.Ok);

                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = client.ClientId.ToString().ToUpper()
                    };
                }
                catch (Exception ex)
                {
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);

                    return new BaseResponseDTO<string>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
            }
        }

        public async Task<BaseResponse> EnableDisableClient(ClientStatusRequestDTO request)
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
                    var statuses = new int[] { 0, 1 };
                    if(!statuses.Contains(request.StatusId))
                        return new BaseResponse
                        {
                            StatusCode = StatusCode.Error,
                            Message = $"Invalid Status"
                        };

                    client.IsDeleted = request.StatusId == 0;
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

        public async Task<BaseResponseDTO<AddClientStepsResponseDTO>> AddClientSteps(AddClientStepsRequestDTO request)
        {
            using (var activity = _activitySource.StartActivity("add.client.task"))
            {
                try
                {
                    activity?.SetTag("request", JsonSerializer.Serialize(request));

                    var validators = new List<IRequestValidator>
                    {
                        new ServiceTypeValidator(request.ServiceTypeId),
                        new EnvironmentValidator(request.Environment),
                        new StepValidator(request.StepId)
                    };

                    _compositeValidator = new CompositeValidator(validators);

                    var validate = _compositeValidator.Validate();
                    if (validate.StatusCode != StatusCode.Success)
                    {
                        activity?.SetStatus(ActivityStatusCode.Error, validate.Message);

                        return new BaseResponseDTO<AddClientStepsResponseDTO>
                        {
                            StatusCode = StatusCode.Error,
                            Message = validate.Message
                        };
                    }

                    var clientId = Guid.Parse(request.ClientId);

                    var client = await _clientChecklistContext.ClientInformation.FindAsync(clientId);

                    if (client == null)
                    {
                        return new BaseResponseDTO<AddClientStepsResponseDTO>
                        {
                            StatusCode = StatusCode.Error,
                            Message = $"Error (Client Not Found)"
                        };
                    }

                    var step = _clientChecklistContext.ClientSteps.Add(new ClientSteps
                    {
                        ClientId = clientId,
                        StepId = request.StepId,
                        StepName = request.StepName,
                        ServiceTypeId = request.ServiceTypeId,
                        Environment = request.Environment,
                        TargetDateCompleted = string.IsNullOrEmpty(request.TargetDateCompleted) ? null : Convert.ToDateTime(request.TargetDateCompleted),
                        ActualDateCompleted = string.IsNullOrEmpty(request.ActualDateCompleted) ? null : Convert.ToDateTime(request.ActualDateCompleted),
                        AssignedTo = request.AssignedTo,
                    }).Entity;

                    _clientChecklistContext.SaveChanges();

                    var ctr = 0;
                    foreach (var subTask in request.ClientSubTasks)
                    {
                        ctr++;
                        _clientChecklistContext.ClientSubtask.Add(new ClientSubtask
                        {
                            ClientStepId = step.ClientStepId,
                            SubtaskId = subTask.SubtaskId,
                            SubtaskName = subTask.SubtaskName,
                            Comment = subTask.Comment,
                            TaskStatusId = subTask.TaskStatusId,
                            SortOrder = ctr,
                        });
                    }

                    _clientChecklistContext.SaveChanges();

                    activity?.SetStatus(ActivityStatusCode.Ok);

                    return new BaseResponseDTO<AddClientStepsResponseDTO>
                    {
                        StatusCode = StatusCode.Success,
                        Message = $"{StatusCode.Success}",
                        Result = new AddClientStepsResponseDTO
                        {
                            Id = step.ClientStepId
                        }
                    };
                }
                catch (Exception ex)
                {
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);

                    if(ex.InnerException?.Message.Contains("duplicate key") ?? false)
                        return new BaseResponseDTO<AddClientStepsResponseDTO>
                        {
                            StatusCode = StatusCode.Error,
                            Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} (Cannot insert duplicate steps - {request.StepName})"
                        };

                    return new BaseResponseDTO<AddClientStepsResponseDTO>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
            }
        }

        public async Task<BaseResponseDTO<bool>> UpdateClientSteps(UpdateClientStepsRequestDTO request)
        {
            using (var activity = _activitySource.StartActivity("add.client.task"))
            {
                try
                {
                    activity?.SetTag("request", JsonSerializer.Serialize(request));

                    var clientTask = await _clientChecklistContext.ClientSteps.FindAsync(request.Id);

                    if (clientTask == null)
                        return new BaseResponseDTO<bool>
                        {
                            StatusCode = StatusCode.Error,
                            Message = $"Client Task Not Found",
                            Result = false
                        };
                    else
                    {
                        clientTask.TargetDateCompleted = string.IsNullOrEmpty(request.TargetDateCompleted) ? null : Convert.ToDateTime(request.TargetDateCompleted);
                        clientTask.ActualDateCompleted = string.IsNullOrEmpty(request.ActualDateCompleted) ? null : Convert.ToDateTime(request.ActualDateCompleted);
                        clientTask.AssignedTo = request.AssignedTo;

                        _clientChecklistContext.SaveChanges();

                        var clientSubtasks = _clientChecklistContext.ClientSubtask.Where(c => c.ClientStepId == clientTask.ClientStepId);
                        if (clientSubtasks.Any())
                            _clientChecklistContext.ClientSubtask.RemoveRange(clientSubtasks);

                        var ctr = 0;
                        foreach (var subTask in request.ClientSubTasks)
                        {
                            ctr++;

                            _clientChecklistContext.ClientSubtask.Add(new ClientSubtask
                            {
                                ClientStepId = clientTask.ClientStepId,
                                SubtaskId = subTask.SubtaskId,
                                SubtaskName = subTask.SubtaskName,
                                Comment = subTask.Comment,
                                TaskStatusId = subTask.TaskStatusId,
                                SortOrder = ctr,
                            });
                        }

                        _clientChecklistContext.SaveChanges();

                        activity?.SetStatus(ActivityStatusCode.Ok);

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
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);

                    return new BaseResponseDTO<bool>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
            }
        }

        #endregion

        #region Utilities

        private bool IsValidStep(int stepId)
        {
            return Enum.IsDefined(typeof(Steps), stepId) ? true : false;
        }

        private bool IsValidServiceType(int serviceTypeId)
        {
            return Enum.IsDefined(typeof(ServiceType), serviceTypeId) ? true : false;
        }

        private bool IsValidEnvironment(int environmentId)
        {
            return Enum.IsDefined(typeof(Environment), environmentId) ? true : false;
        }

        #endregion
    }
}

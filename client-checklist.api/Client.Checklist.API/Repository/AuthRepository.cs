using Client.Checklist.API.Telemetry;
using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using System.Diagnostics;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Client.Checklist.API.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ActivitySource _activitySource;
        private readonly HttpClient _httpClient;
        private string _version = "3";

        public AuthRepository(HttpClient httpClient, Instrumentation instrumentation)
        {
            _httpClient = httpClient;
            _activitySource = instrumentation.ActivitySource;

        }
        public async Task<BaseResponseDTO<TokenModel>> Login(LogInModel loginModel)
        {
            using(var activity = _activitySource.StartActivity("auth.login"))
            {
                activity?.SetTag("user.name", loginModel.Username);
                try
                {
                    var response = await _httpClient.PostAsync($"v1/login", new StringContent(JsonSerializer.Serialize(loginModel), Encoding.UTF8, "application/json"));

                    if (response.IsSuccessStatusCode)
                    {
                        activity?.SetStatus(ActivityStatusCode.Ok);
                        return JsonSerializer.Deserialize<BaseResponseDTO<TokenModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<TokenModel>();
                    }
                    else
                    {
                        activity?.SetTag("http.status.code", response.StatusCode.ToString());
                        if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                            return JsonSerializer.Deserialize<BaseResponseDTO<TokenModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                                ?? new BaseResponseDTO<TokenModel>();
                        else
                        {
                            activity?.SetStatus(ActivityStatusCode.Error, StatusCode.Error.ToString());
                            return new BaseResponseDTO<TokenModel>
                            {
                                StatusCode = StatusCode.Error,
                                Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({response.ReasonPhrase})"
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
                    return new BaseResponseDTO<TokenModel>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
            }
        }
        public async Task<BaseResponseDTO<UserModel>> Authenticate(string token)
        {
            using(var activity = _activitySource.StartActivity("auth.authenticate"))
            {
                try
                {
                    activity?.SetTag("x-app-id", $"{Application.ClientChecklist}");
                    if (_httpClient.DefaultRequestHeaders.Contains("x-app-id"))
                        _httpClient.DefaultRequestHeaders.Remove("x-app-id");
                    _httpClient.DefaultRequestHeaders.Add("x-app-id", $"{(int)Application.ClientChecklist}");

                    if (_httpClient.DefaultRequestHeaders.Contains("x-operator-token"))
                        _httpClient.DefaultRequestHeaders.Remove("x-operator-token");
                    activity?.SetTag("x-operator-token", token);
                    _httpClient.DefaultRequestHeaders.Add("x-operator-token", token);

                    var response = await _httpClient.PostAsync($"v1/authentication/operator", new StringContent(string.Empty, Encoding.UTF8, "application/json"));

                    if (response.IsSuccessStatusCode)
                    {
                        activity?.SetStatus(ActivityStatusCode.Ok);
                        return JsonSerializer.Deserialize<BaseResponseDTO<UserModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<UserModel>();
                    }
                    else
                    {
                        activity?.SetTag("http.status.code", response.StatusCode);
                        if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                            return JsonSerializer.Deserialize<BaseResponseDTO<UserModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                                ?? new BaseResponseDTO<UserModel>();
                        else
                        {
                            activity?.SetStatus(ActivityStatusCode.Error, StatusCode.Error.ToString());
                            return new BaseResponseDTO<UserModel>
                            {
                                StatusCode = StatusCode.Error,
                                Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({response.ReasonPhrase})"
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
                    return new BaseResponseDTO<UserModel>
                    {
                        StatusCode = StatusCode.Error,
                        Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                    };
                }
            }
        }

        public async Task<BaseResponseDTO<bool>> Logout(string token)
        {
            using(var activity = _activitySource.StartActivity("auth.logout"))
            {
                try
                {
                    if (_httpClient.DefaultRequestHeaders.Contains("x-operator-token"))
                        _httpClient.DefaultRequestHeaders.Remove("x-operator-token");
                    _httpClient.DefaultRequestHeaders.Add("x-operator-token", token);

                    var response = await _httpClient.PostAsync($"v1/logout", new StringContent(string.Empty, Encoding.UTF8, "application/json"));

                    if (response.IsSuccessStatusCode)
                    {
                        activity?.SetStatus(ActivityStatusCode.Ok);
                        return JsonSerializer.Deserialize<BaseResponseDTO<bool>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<bool>();
                    }
                    else
                    {
                        activity?.SetTag("http.status.code", response.StatusCode);
                        if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                            return JsonSerializer.Deserialize<BaseResponseDTO<bool>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                                ?? new BaseResponseDTO<bool>();
                        else
                        {
                            activity?.SetStatus(ActivityStatusCode.Error, StatusCode.Error.ToString());
                            return new BaseResponseDTO<bool>
                            {
                                StatusCode = StatusCode.Error,
                                Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({response.ReasonPhrase})"
                            };
                        }
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

        public async Task<BaseResponseDTO<string>> CreateClientToken(CreateClientTokenRequestDTO request)
        {
            try
            {
                if (_httpClient.DefaultRequestHeaders.Contains("x-app-id"))
                    _httpClient.DefaultRequestHeaders.Remove("x-app-id");
                _httpClient.DefaultRequestHeaders.Add("x-app-id", $"{(int)Application.ClientChecklist}");

                var response = await _httpClient.PostAsync($"v1/api/user/client/token", new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    return JsonSerializer.Deserialize<BaseResponseDTO<string>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                        ?? new BaseResponseDTO<string>();
                else
                {
                    if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                        return JsonSerializer.Deserialize<BaseResponseDTO<string>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<string>();
                    else
                    {
                        return new BaseResponseDTO<string>
                        {
                            StatusCode = StatusCode.Error,
                            Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({response.ReasonPhrase})"
                        };
                    }
                }
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
    }
}

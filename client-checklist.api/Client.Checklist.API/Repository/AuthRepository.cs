using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Client.Checklist.API.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly HttpClient _httpClient;
        private string _version = "3";

        public AuthRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<BaseResponseDTO<TokenModel>> Login(LogInModel loginModel)
        {
            try
            {
                var response = await _httpClient.PostAsync($"v1/login", new StringContent(JsonSerializer.Serialize(loginModel), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    return JsonSerializer.Deserialize<BaseResponseDTO<TokenModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                        ?? new BaseResponseDTO<TokenModel>();
                else
                {
                    if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                        return JsonSerializer.Deserialize<BaseResponseDTO<TokenModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<TokenModel>();
                    else
                    {
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
                return new BaseResponseDTO<TokenModel>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }
        public async Task<BaseResponseDTO<UserModel>> Authenticate(string token)
        {
            try
            {
                if (_httpClient.DefaultRequestHeaders.Contains("x-app-id"))
                    _httpClient.DefaultRequestHeaders.Remove("x-app-id");
                _httpClient.DefaultRequestHeaders.Add("x-app-id", $"{(int)Application.ClientChecklist}");

                if (_httpClient.DefaultRequestHeaders.Contains("x-operator-token"))
                    _httpClient.DefaultRequestHeaders.Remove("x-operator-token");
                _httpClient.DefaultRequestHeaders.Add("x-operator-token", token);

                var response = await _httpClient.PostAsync($"v1/authentication/operator", new StringContent(string.Empty, Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    return JsonSerializer.Deserialize<BaseResponseDTO<UserModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                        ?? new BaseResponseDTO<UserModel>();
                else
                {
                    if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                        return JsonSerializer.Deserialize<BaseResponseDTO<UserModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<UserModel>();
                    else
                    {
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
                return new BaseResponseDTO<UserModel>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

        public async Task<BaseResponseDTO<bool>> Logout(string token)
        {
            try
            {
                if (_httpClient.DefaultRequestHeaders.Contains("x-operator-token"))
                    _httpClient.DefaultRequestHeaders.Remove("x-operator-token");
                _httpClient.DefaultRequestHeaders.Add("x-operator-token", token);

                var response = await _httpClient.PostAsync($"v1/logout", new StringContent(string.Empty, Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    return JsonSerializer.Deserialize<BaseResponseDTO<bool>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                        ?? new BaseResponseDTO<bool>();
                else
                {
                    if (response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.Unauthorized)
                        return JsonSerializer.Deserialize<BaseResponseDTO<bool>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true })
                            ?? new BaseResponseDTO<bool>();
                    else
                    {
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
                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }

    }
}

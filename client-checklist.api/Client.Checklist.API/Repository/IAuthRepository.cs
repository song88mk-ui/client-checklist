using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IAuthRepository
    {
        Task<BaseResponseDTO<TokenModel>> Login(LogInModel loginModel);
        Task<BaseResponseDTO<UserModel>> Authenticate(string token);
        Task<BaseResponseDTO<bool>> Logout(string token);
        Task<BaseResponseDTO<string>> CreateClientToken(CreateClientTokenRequestDTO request, string userToken);
    }
}

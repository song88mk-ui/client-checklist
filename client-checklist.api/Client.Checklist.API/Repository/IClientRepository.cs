using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponseDTO<bool>> Logout(LogOutRequestDTO request);
        Task<BaseResponseDTO<AuthResponseDTO>> Authenticate(AuthRequestDTO request);
        Task<BaseResponseDTO<object>> GetClient(string request);
    }
}

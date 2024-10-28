using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInDTO request);
        Task<BaseResponseDTO<object>> GetClient(string request);
    }
}

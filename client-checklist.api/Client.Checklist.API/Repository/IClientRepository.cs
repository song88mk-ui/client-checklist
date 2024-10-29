using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponse> Logout(LogOutRequestDTO request);
        Task<BaseResponse> CreateOrUpdateClientInformation(CreateOrUpdateClientRequestDTO request);
        Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList();
    }
}

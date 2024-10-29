using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponse> Logout(LogOutRequestDTO request);
        Task<BaseResponseDTO<ClientInformationModel>> GetClientInformation(string clientId, string clientToken);
        Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList();
        Task<BaseResponse> CreateOrUpdateClientInformation(CreateOrUpdateClientRequestDTO request);
    }
}

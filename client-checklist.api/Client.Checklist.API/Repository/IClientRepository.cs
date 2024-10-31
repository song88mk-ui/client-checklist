using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponse> Logout(LogOutRequestDTO request);
        Task<BaseResponseDTO<ClientInformationModel>> GetClientInformation(string clientId, string token);
        Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList(string userToken);
        Task<BaseResponseDTO<string>> CreateClientInformation(CreateOrUpdateClientRequestDTO request, string userToken);
        Task<BaseResponseDTO<string>> UpdateClientInformation(CreateOrUpdateClientRequestDTO request, string userToken);
        Task<BaseResponse> DeleteClientInformation(DeleteClientRequestDTO request, string userToken);
    }
}

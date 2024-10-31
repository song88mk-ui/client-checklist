using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponse> Logout(LogOutRequestDTO request);
        Task<BaseResponseDTO<ClientInformationModel>> GetClientInformation(string clientId);
        Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList();
        Task<BaseResponseDTO<string>> CreateClientInformation(CreateOrUpdateClientRequestDTO request);
        Task<BaseResponseDTO<string>> UpdateClientInformation(CreateOrUpdateClientRequestDTO request);
        Task<BaseResponse> DeleteClientInformation(DeleteClientRequestDTO request);
        Task<BaseResponseDTO<string>> AddClientTask(AddClientTaskRequestDTO request);
    }
}

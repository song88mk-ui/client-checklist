using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponse> Logout(LogOutRequestDTO request);
        Task<BaseResponseDTO<ClientInformationResponseDTO>> GetClientInformation(string clientId);
        Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList();
        Task<BaseResponseDTO<string>> CreateClientInformation(CreateOrUpdateClientRequestDTO request);
        Task<BaseResponseDTO<string>> UpdateClientInformation(CreateOrUpdateClientRequestDTO request);
        Task<BaseResponse> DeleteClientInformation(DeleteClientRequestDTO request);
        Task<BaseResponseDTO<bool>> AddClientTask(AddClientTaskRequestDTO request);
        Task<BaseResponseDTO<bool>> UpdateClientTask(UpdateClientTaskRequestDTO request);
    }
}

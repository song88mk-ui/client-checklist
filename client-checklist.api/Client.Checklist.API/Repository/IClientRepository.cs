using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<LoginResponseDTO>> Login(LogInRequestDTO request);
        Task<BaseResponse> Logout(LogOutRequestDTO request);
        Task<BaseResponseDTO<ClientInformationResponseDTO>> GetClientInformation(string clientId, bool clientView);
        Task<BaseResponseDTO<ClientInformationListDTO>> GetClientList(string userToken);
        Task<BaseResponseDTO<string>> CreateClientInformation(CreateClientRequestDTO request, string userToken);
        Task<BaseResponseDTO<string>> UpdateClientInformation(UpdateClientRequestDTO request, string userToken);
        Task<BaseResponse> EnableDisableClient(ClientStatusRequestDTO request);
        Task<BaseResponseDTO<AddClientStepsResponseDTO>> AddClientSteps(AddClientStepsRequestDTO request);
        Task<BaseResponseDTO<bool>> UpdateClientSteps(UpdateClientStepsRequestDTO request);
    }
}

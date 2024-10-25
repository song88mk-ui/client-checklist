using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public interface IClientRepository
    {
        Task<BaseResponseDTO<object>> GetClient(string request);
    }
}

using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public ClientRepository(IConfiguration configuration, IAuthRepository authRepository)
        {
            _configuration = configuration;
            _authRepository = authRepository;
        }

        public async Task<BaseResponseDTO<object>> GetClient(string request)
        {
            try
            {
                //TODO: get client by token
                return new BaseResponseDTO<object>
                {
                    StatusCode = StatusCode.Success,
                    Message = $"{StatusCode.Success}"
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseDTO<object>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"{StatusCode.Error.ToString().Replace('_', ' ')} ({ex.Message})"
                };
            }
        }
        

    }
}

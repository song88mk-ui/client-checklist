using Client.Checklist.Shared.Enums;

namespace Client.Checklist.Shared.Models
{
    public class BaseResponseDTO<T> : BaseResponse
    {
        
        public T Result { get; set; }
    }

    public class BaseResponse
    {
        public StatusCode StatusCode { get; set; }
        public string Message { get; set; }
    }
}

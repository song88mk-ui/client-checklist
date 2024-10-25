using Client.Checklist.Shared.Enums;

namespace Client.Checklist.Shared.Models
{
    public class BaseResponseDTO<T>
    {
        public StatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }
}

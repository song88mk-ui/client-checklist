
namespace Client.Checklist.Shared.Models
{
    public class LoginResponseDTO
    {
        public string UserToken { get; set; }
        public string RoleName { get; set; }
        public int AccessType { get; set; }
    }
}

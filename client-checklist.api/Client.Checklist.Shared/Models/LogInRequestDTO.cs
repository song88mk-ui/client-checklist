namespace Client.Checklist.Shared.Models
{
    public class LogInRequestDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string IpAddress { get; set; } = "";
    }
}

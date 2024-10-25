using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Models
{
    public class LogInModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }
        [MaxLength(15, ErrorMessage = "Password must not be over 15 characters")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string Provider { get; set; }
        public string UserAgent { get; set; } = "";
        public string IpAddress { get; set; } = "";
        public string Country { get; set; } = "";
        public string LanguageCode { get; set; } = "";
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}

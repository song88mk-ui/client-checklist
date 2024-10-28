using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Models
{
    public class LogInDTO
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }
        [MaxLength(15, ErrorMessage = "Password must not be over 15 characters")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}

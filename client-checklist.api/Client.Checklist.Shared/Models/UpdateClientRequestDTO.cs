namespace Client.Checklist.Shared.Models
{
    public class UpdateClientRequestDTO : CreateClientRequestDTO
    {
        public string ClientId { get; set; }
        public int TaskStatus { get; set; }
    }
}

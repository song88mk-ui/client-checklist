namespace Client.Checklist.Shared.Models
{
    public class CreateClientRequestDTO
    {
        //public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string? Domain { get; set; }
        public string? SSLCert { get; set; }
        public int ServiceTypeId { get; set; }
        public List<string> Languages { get; set; }
        public List<string> Currencies { get; set; }
        public List<string> Sports { get; set; }
        public List<string> Markets { get; set; }
        public DateTime? LaunchDate { get; set; }
        public Manager? MainDecisionMaker { get; set; }
        public Manager? FinanceManager { get; set; }
        public Manager? ProductManager { get; set; }
        public Manager? TechnicalManager { get; set; }
        public Manager? CustomerServiceManager { get; set; }
        public Manager AccountManager { get; set; }
        public string SocialAccount { get; set; }
    }

    public class Manager
    {
        public string Name { get; set; }
        public string Number { get; set; }
    }
}

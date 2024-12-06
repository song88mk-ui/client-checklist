using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Data.ClientChecklist.Entities
{
    public class ClientInformation
    {
        [Key]
        public Guid ClientId { get; set; }
        public string ClientName { get; set; }
        public string Domain { get; set; }
        public string SSLCertificate { get; set; }
        public int ServiceTypeId { get; set; }
        public int TaskStatus { get; set; }
        public string SupportedLanguage { get; set; }
        public string SupportedCurrency { get; set; }
        public string SupportedSports { get; set; }
        public string TargetMarkets { get; set; }
        public DateTime? TargetLaunchDate { get; set; }
        public string MainDecisionMaker { get; set; }
        public string MainDecisionMakerContact { get; set; }
        public string FinanceManager { get; set; }
        public string FinanceManagerContact { get; set; }
        public string ProductManager { get; set; }
        public string ProductManagerContact { get; set; }
        public string TechnicalManager { get; set; }
        public string TechnicalManagerContact { get; set; }
        public string CustomerServiceManager { get; set; }
        public string CustomerServiceManagerContact { get; set; }
        public string AccountManager { get; set; }
        public string AccountManagerContact { get; set; }
        public string SocialAccount { get; set; }
        public bool IsDeleted { get; set; }
    }
}

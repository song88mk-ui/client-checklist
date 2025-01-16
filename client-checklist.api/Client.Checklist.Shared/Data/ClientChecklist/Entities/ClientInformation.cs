using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Data.ClientChecklist.Entities
{
    public class ClientInformation
    {
        [Key]
        public Guid ClientId { get; set; }
        [MaxLength(100)]
        public string ClientName { get; set; }
        [MaxLength(200)]
        public string Domain { get; set; }
        public string SSLCertificate { get; set; }
        public int ServiceTypeId { get; set; }
        public int TaskStatus { get; set; }
        public string SupportedLanguage { get; set; }
        public string SupportedCurrency { get; set; }
        public string SupportedSports { get; set; }
        public string TargetMarkets { get; set; }
        public DateTime? TargetLaunchDate { get; set; }
        [MaxLength(150)]
        public string MainDecisionMaker { get; set; }
        [MaxLength(150)]
        public string MainDecisionMakerContact { get; set; }
        [MaxLength(150)]
        public string FinanceManager { get; set; }
        [MaxLength(150)]
        public string FinanceManagerContact { get; set; }
        [MaxLength(150)]
        public string ProductManager { get; set; }
        [MaxLength(150)]
        public string ProductManagerContact { get; set; }
        [MaxLength(150)]
        public string TechnicalManager { get; set; }
        [MaxLength(150)]
        public string TechnicalManagerContact { get; set; }
        [MaxLength(150)]
        public string CustomerServiceManager { get; set; }
        [MaxLength(150)]
        public string CustomerServiceManagerContact { get; set; }
        [MaxLength(150)]
        public string AccountManager { get; set; }
        [MaxLength(150)]
        public string AccountManagerContact { get; set; }
        [MaxLength(150)]
        public string SocialAccount { get; set; }
        public bool IsDeleted { get; set; }
    }
}

using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Data.ClientChecklist.Entities
{
    public class ClientSteps
    {
        [Key]
        public long ClientStepId { get; set; }
        public Guid ClientId { get; set; }
        public int StepId { get; set; }
        public string StepName { get; set; }
        public int ServiceTypeId { get; set; }
        public int Environment { get; set; }
        public DateTime? TargetDateCompleted { get; set; }
        public DateTime? ActualDateCompleted { get; set; }
        public string AssignedTo { get; set; }
        public int SortOrder { get; set; }
    }
}

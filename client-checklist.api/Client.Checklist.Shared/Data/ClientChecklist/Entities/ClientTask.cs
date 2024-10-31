using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Data.ClientChecklist.Entities
{
    public class ClientTask
    {
        [Key]
        public long ClientTaskId { get; set; }
        public Guid ClientId { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int ServiceTypeId { get; set; }
        public int Environment { get; set; }
        public DateTime? TargetDateCompleted { get; set; }
        public DateTime? ActualDateCompleted { get; set; }
        public string AssignedTo { get; set; }
        public int SortOrder { get; set; }
    }
}

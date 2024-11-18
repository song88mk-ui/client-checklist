using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Client.Checklist.Shared.Data.ClientChecklist.Entities
{
    public class ClientSubtask
    {
        [Key]
        public long ClientStepId { get; set; }
        [Key]
        public int SubtaskId { get; set; }
        public string SubtaskName { get; set; }
        public string Comment { get; set; }
        public int TaskStatusId { get; set; }
        public string AssignedTo { get; set; }
        public int SortOrder { get; set; }
    }
}

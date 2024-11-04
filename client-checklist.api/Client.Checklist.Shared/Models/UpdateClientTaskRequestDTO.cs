namespace Client.Checklist.Shared.Models
{
    public class UpdateClientTaskRequestDTO
    {
        public UpdateClientTaskRequestDTO()
        {
            SubTasks = new List<ClientSubTask>();
        }

        public long ClientTaskId { get; set; }
        public string ClientId { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int ServiceTypeId { get; set; }
        public string? TargetDateCompleted { get; set; }
        public string? ActualDateCompleted { get; set; }
        public string AssignedTo { get; set; }
        public int SortOrder { get; set; }
        public int Environment { get; set; }
        public List<ClientSubTask> SubTasks { get; set; }
    }
}

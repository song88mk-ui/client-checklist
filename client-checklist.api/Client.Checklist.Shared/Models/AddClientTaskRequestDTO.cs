namespace Client.Checklist.Shared.Models
{
    public class AddClientTaskRequestDTO
    {
        public AddClientTaskRequestDTO()
        {
            SubTasks = new List<ClientSubTask>();
        }

        public string ClientId { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int ServiceTypeId { get; set; }
        public string TargetDateCompleted { get; set; }
        public string ActualDateCompleted { get; set; }
        public string AssignedTo { get; set; }
        public int SortOrder { get; set; }
        public int Environment { get; set; }
        public List<ClientSubTask> SubTasks { get; set; }
    }

    public class ClientSubTask
    {
        public int SubtaskId { get; set; }
        public string SubtaskName { get; set; }
        public string Comment { get; set; }
        public int TaskStatusId { get; set; }
        public int ClientTaskStatusId { get; set; }
        public int SortOrder { get; set; }
    }
}

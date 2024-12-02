namespace Client.Checklist.Shared.Models
{
    public class AddClientStepsRequestDTO
    {
        public AddClientStepsRequestDTO()
        {
            ClientSubTasks = new List<ClientSubTask>();
        }

        public string ClientId { get; set; }
        public int StepId { get; set; }
        public string StepName { get; set; }
        public int ServiceTypeId { get; set; }
        public string? TargetDateCompleted { get; set; }
        public string? ActualDateCompleted { get; set; }
        public string AssignedTo { get; set; }
        public int Environment { get; set; }
        public List<ClientSubTask> ClientSubTasks { get; set; }
    }

    public class ClientSubTask
    {
        public int SubtaskId { get; set; }
        public string SubtaskName { get; set; }
        public string Comment { get; set; }
        public int TaskStatusId { get; set; }
    }
}

namespace Client.Checklist.Shared.Models
{
    public class UpdateClientStepsRequestDTO
    {
        public UpdateClientStepsRequestDTO()
        {
            ClientSubTasks = new List<ClientSubTask>();
        }

        public long Id { get; set; }
        public string StepName { get; set; }
        public string? TargetDateCompleted { get; set; }
        public string? ActualDateCompleted { get; set; }
        public string AssignedTo { get; set; }
        public List<ClientSubTask> ClientSubTasks { get; set; }
    }
}

namespace Client.Checklist.Shared.Models
{
    public class ClientInformationResponseDTO
    {
        public ClientInformationResponseDTO()
        {
            ClientTasks = new List<ClientTaskModel>();
        }

        public ClientInformationModel Client { get; set; }
        public List<ClientTaskModel> ClientTasks { get; set; }
    }

    public class ClientTaskModel
    {
        public ClientTaskModel()
        {
            ClientSubtasks = new List<ClientSubtaskModel>();
        }

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
        public List<ClientSubtaskModel> ClientSubtasks { get; set; }
    }

    public class ClientSubtaskModel
    {
        public int SubtaskId { get; set; }
        public string SubtaskName { get; set; }
        public string Comment { get; set; }
        public int TaskStatusId { get; set; }
        public int ClientTaskStatusId { get; set; }
        public int SortOrder { get; set; }
    }
}

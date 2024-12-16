using Client.Checklist.Shared.Enums;
using Environment = Client.Checklist.Shared.Enums.Environment;
using TaskStatus = Client.Checklist.Shared.Enums.TaskStatus;

namespace Client.Checklist.Shared.Models
{
    public class ClientInformationResponseDTO
    {
        public ClientInformationResponseDTO()
        {
            ClientSteps = new List<ClientStepModel>();
        }

        public ClientInformationModel Client { get; set; }
        public List<ClientStepModel> ClientSteps { get; set; }
    }

    public class ClientStepModel
    {
        public ClientStepModel()
        {
            ClientSubtasks = new List<ClientSubtaskModel>();
        }

        public long ClientStepId { get; set; }
        public Guid ClientId { get; set; }
        public Steps Step { get; set; }
        public string StepName { get; set; }
        public ServiceType ServiceType { get; set; }
        public Environment Environment { get; set; }
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
        public TaskStatus TaskStatus { get; set; }
    }
}

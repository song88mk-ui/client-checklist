using Azure.Core;
using Client.Checklist.Shared.Enums;
using Client.Checklist.Shared.Models;

namespace Client.Checklist.API.Repository
{
    public class ClientIdValidator : IRequestValidator
    {
        private string _clientId;

        public ClientIdValidator(string clientId)
        {
            _clientId = clientId;
        }

        public BaseResponseDTO<bool> Validate()
        {

            if (!Guid.TryParse(_clientId, out Guid result))
                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Error,
                    Message = $"Invalid Client ID"
                };

            return null; // Indicates no validation errors
        }
    }

    public class ServiceTypeValidator : IRequestValidator
    {
        private int _serviceTypeId;

        public ServiceTypeValidator(int serviceTypeId)
        {
            _serviceTypeId = serviceTypeId;
        }

        public BaseResponseDTO<bool> Validate()
        {
            if (!_serviceTypeId.IsValidServiceType())
            {
                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Error,
                    Message = "Error (Invalid Service Type)"
                };
            }

            return null; // Indicates no validation errors
        }
    }

    public class EnvironmentValidator : IRequestValidator
    {
        private int _environmentTypeId;
        public EnvironmentValidator(int environmentTypeId)
        {
            _environmentTypeId = environmentTypeId;
        }

        public BaseResponseDTO<bool> Validate()
        {
            if (!_environmentTypeId.IsValidEnvironment())
            {
                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Error,
                    Message = "Error (Invalid Environment)"
                };
            }

            return null;
        }
    }

    public class StepValidator : IRequestValidator
    {
        private int _stepTypeId;
        public StepValidator(int stepTypeId)
        {
            _stepTypeId = stepTypeId;
        }

        public BaseResponseDTO<bool> Validate()
        {
            if (!_stepTypeId.IsValidStep())
            {
                return new BaseResponseDTO<bool>
                {
                    StatusCode = StatusCode.Error,
                    Message = "Error (Invalid Steps)"
                };
            }

            return null;
        }
    }

    public class CompositeValidator
    {
        private readonly IEnumerable<IRequestValidator> _validators;

        public CompositeValidator(IEnumerable<IRequestValidator> validators)
        {
            _validators = validators;
        }

        public BaseResponseDTO<bool> Validate()
        {
            foreach (var validator in _validators)
            {
                var result = validator.Validate();
                if (result != null) return result; // Return the first validation error
            }

            return new BaseResponseDTO<bool>
            {
                StatusCode = StatusCode.Success,
                Message = "Validation passed"
            };
        }
    }
}

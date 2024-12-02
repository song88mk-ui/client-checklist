using Azure.Core;
using Client.Checklist.Shared.Models;
using System.Diagnostics;

namespace Client.Checklist.API.Repository
{
    public interface IRequestValidator
    {
        BaseResponseDTO<bool> Validate();
    }
}

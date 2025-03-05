using Microsoft.AspNetCore.Mvc;

namespace Client.Checklist.API.Controllers
{
    public class BaseController : ControllerBase
    {
        public bool ClientView { get; set; }
    }
}
namespace Client.Checklist.Shared.Enums
{
    public static class ValidateExtension
    {
        public static bool IsValidStep(this int stepId)
        {
            return Enum.IsDefined(typeof(Steps), stepId) ? true : false;
        }

        public static bool IsValidServiceType(this int serviceTypeId)
        {
            return Enum.IsDefined(typeof(ServiceType), serviceTypeId) ? true : false;
        }

        public static bool IsValidEnvironment(this int environmentId)
        {
            return Enum.IsDefined(typeof(Environment), environmentId) ? true : false;
        }
    }
}

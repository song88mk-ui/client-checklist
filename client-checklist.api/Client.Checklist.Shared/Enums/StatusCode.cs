namespace Client.Checklist.Shared.Enums
{
    public enum StatusCode
    {
        Success = 100,
        Missing_Or_Unsupported_APIKey_In_Request_Headers = 101,
        Missing_Or_Unsupported_ClientId_In_Request_Headers = 102,
        Missing_Or_Unsupported_OperatorToken_In_Request_Headers = 103,

        Maintenance = 205,

        Error = 1000
    }
}

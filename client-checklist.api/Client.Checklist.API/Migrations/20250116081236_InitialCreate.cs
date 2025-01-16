using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Client.Checklist.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientInformation",
                columns: table => new
                {
                    ClientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Domain = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SSLCertificate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceTypeId = table.Column<int>(type: "int", nullable: false),
                    TaskStatus = table.Column<int>(type: "int", nullable: false),
                    SupportedLanguage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupportedCurrency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupportedSports = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TargetMarkets = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TargetLaunchDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MainDecisionMaker = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MainDecisionMakerContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinanceManager = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinanceManagerContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductManager = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductManagerContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TechnicalManager = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TechnicalManagerContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerServiceManager = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerServiceManagerContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountManager = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountManagerContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SocialAccount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientInformation", x => x.ClientId);
                });

            migrationBuilder.CreateTable(
                name: "ClientSteps",
                columns: table => new
                {
                    ClientStepId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StepId = table.Column<int>(type: "int", nullable: false),
                    StepName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceTypeId = table.Column<int>(type: "int", nullable: false),
                    Environment = table.Column<int>(type: "int", nullable: false),
                    TargetDateCompleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualDateCompleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AssignedTo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientSteps", x => x.ClientStepId);
                });

            migrationBuilder.CreateTable(
                name: "ClientSubtask",
                columns: table => new
                {
                    ClientStepId = table.Column<long>(type: "bigint", nullable: false),
                    SubtaskId = table.Column<int>(type: "int", nullable: false),
                    SubtaskName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaskStatusId = table.Column<int>(type: "int", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientSubtask", x => new { x.ClientStepId, x.SubtaskId });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientInformation");

            migrationBuilder.DropTable(
                name: "ClientSteps");

            migrationBuilder.DropTable(
                name: "ClientSubtask");
        }
    }
}

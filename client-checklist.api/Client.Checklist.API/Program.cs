using Client.Checklist.API.ActionFilters;
using Client.Checklist.API.Extensions;
using Client.Checklist.API.Repository;
using Client.Checklist.API.Telemetry;
using Client.Checklist.Shared.Data.ClientChecklist;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// configure logging to single line, it will be easier to correlate
// from application logs
builder.Logging.ClearProviders();
builder.Logging.AddSimpleConsole(opts => { opts.SingleLine = true;});

// Add services to the container.
TelemetryOptions telemetryOptions = new();
builder.Configuration.GetSection("Telemetry").Bind(telemetryOptions);
builder.Services.AddTelemetry(telemetryOptions);
builder.Services.AddHealthChecks();
builder.Services.AddControllers();
builder.Services.AddDbContextPool<ClientChecklistContext>(o => o.UseSqlServer(builder.Configuration["ConnectionStrings:ClientChecklist"], options =>
                options.CommandTimeout(180)));
builder.Services.AddScoped<AuthorizationFilter>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddHttpClient<IAuthRepository, AuthRepository>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["API:AuthenticationAPI:Uri"]);
    client.DefaultRequestHeaders.Clear();
    client.DefaultRequestHeaders.Add("x-api-key", builder.Configuration["API:AuthenticationAPI:Security:APIKey"]);
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAllOrigins");

app.MapControllers();
app.MapHealthChecks("/healthz");

app.Run();

using Client.Checklist.API.ActionFilters;
using Client.Checklist.API.Repository;
using Client.Checklist.API.Telemetry;
using Client.Checklist.Shared.Data.ClientChecklist;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, _, serilog) =>
{
    serilog.ReadFrom.Configuration(context.Configuration);
});

// telemetry
builder.Services.AddSingleton<Instrumentation>();
builder.Services.AddTelemetry(new TelemetrySettings(
            ServiceName: Instrumentation.ActivitySourceName,
            ActivitySourceName: Instrumentation.ActivitySourceName,
            MeterName: Instrumentation.MeterName));

// Add services to the container.
builder.Services.AddHealthChecks();
builder.Services.AddControllers();
builder.Services.AddDbContextPool<ClientChecklistContext>(o => o.UseSqlServer(builder.Configuration["ConnectionStrings:ClientChecklist"], options =>
                options.CommandTimeout(180).MigrationsAssembly("Client.Checklist.API")
                ));
builder.Services.AddScoped<AuthorizationFilter>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddHttpClient<IAuthRepository, AuthRepository>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["API:AuthenticationAPI:Uri"]);
    client.DefaultRequestHeaders.Clear();
    client.DefaultRequestHeaders.Add("x-api-key", builder.Configuration["API:AuthenticationAPI:Security:APIKey"]);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
                    });
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

using Client.Checklist.API.Telemetry;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;
using System;


namespace Client.Checklist.API.Extensions
{
    public static class TelemetryExtention
    {
        private static TelemetryOptions _options { get; set; }
        public static IServiceCollection AddTelemetry(this IServiceCollection services, TelemetryOptions options)
        {
            _options = options;

            Action<ResourceBuilder> resource = r => r.AddService(
                    serviceName: "Checklist.API",
                    serviceNamespace: options.Environment ?? "dev",
                    serviceVersion: "latest",
                    serviceInstanceId: Environment.MachineName);

            services.AddSingleton<Instrumentation>();

            if (options.Enabled)
            {
                services
                    .AddOpenTelemetry()
                    .ConfigureResource(resource)
                    .WithTracing(t =>
                    {
                        t.AddSource(Instrumentation.ActivitySourceName)
                        .SetSampler(new AlwaysOnSampler())
                        .AddHttpClientInstrumentation(
                            (opts) => opts.FilterHttpRequestMessage =
                                (req) =>
                                {
                                    var uriString = req.RequestUri.ToString();
                                    var isAzureReq = uriString.Contains("monitor.azure.com") ||
                                                     uriString.Contains("visualstudio.com");
                                    return !isAzureReq;
                                }
                        )
                        .AddOtlpExporter(o =>
                        {
                            o.Protocol = OtlpExportProtocol.HttpProtobuf;
                            o.Endpoint = new Uri(options.Collector + "/v1/traces");
                        });
                    })
                    .WithMetrics(metrics =>
                    {
                        metrics
                        .AddMeter(Instrumentation.MeterName)
                        .AddRuntimeInstrumentation()
                        .AddHttpClientInstrumentation()
                        .AddOtlpExporter(o =>
                        {
                            o.Protocol = OtlpExportProtocol.HttpProtobuf;
                            o.Endpoint = new Uri(options.Collector + "/v1/metrics");
                        });
                    });
            }

            return services;
        }
    }
}

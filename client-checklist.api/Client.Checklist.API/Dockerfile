FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /source

COPY Client.Checklist.API Client.Checklist.API
COPY Client.Checklist.Shared Client.Checklist.Shared

WORKDIR /source/Client.Checklist.API

RUN dotnet restore
RUN dotnet build --configuration Release --no-restore
RUN dotnet publish -o /app && \
  cd /app && rm -f appsettings.Development.json

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_HTTP_PORTS=80
EXPOSE 80
WORKDIR /app

COPY --from=build /app .
CMD ["/usr/bin/dotnet", "Client.Checklist.API.dll"]

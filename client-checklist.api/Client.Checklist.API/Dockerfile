FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY client-checklist.api/Client.Checklist.API Client.Checklist.API
COPY client-checklist.api/Client.Checklist.Shared Client.Checklist.Shared

WORKDIR /src/Client.Checklist.API

ARG NUGET_PASSWORD

RUN dotnet nuget add source \
  --username FlyingCockatoo \
  --password ${NUGET_PASSWORD} \
  --store-password-in-clear-text \
  --name github "https://nuget.pkg.github.com/FlyingCockatoo/index.json"

RUN dotnet restore
RUN dotnet build \
  --no-restore \
  --configuration Release
RUN dotnet publish \
  --no-restore \
  -o /app && \
  cd /app && \
  rm -f appsettings.*.json

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_HTTP_PORTS=3000
WORKDIR /app

COPY --from=build /app .
CMD ["/usr/bin/dotnet", "Client.Checklist.API.dll"]

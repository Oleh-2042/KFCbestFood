# Етап збірки
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
COPY . .
RUN dotnet restore "ProjektZespolowy/ProjektZespolowy.csproj"
RUN dotnet publish "ProjektZespolowy/ProjektZespolowy.csproj" -c Release -o /app/out

# Етап запуску
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "ProjektZespolowy.dll"]

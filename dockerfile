# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Копіюємо весь репозиторій
COPY . .

# Відновлюємо пакети та публікуємо проект
RUN dotnet restore "projekt zespolowy/projekt zespolowy.csproj"
RUN dotnet publish "projekt zespolowy/projekt zespolowy.csproj" -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "projekt_zespolowy.dll"]

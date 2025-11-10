# Встановлюємо SDK для збірки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Копіюємо файли проекту
COPY . ./

# Відновлюємо залежності та збираємо
RUN dotnet restore "projekt zespolowy.sln"
RUN dotnet publish "projekt zespolowy/projekt zespolowy.csproj" -c Release -o /app/publish

# Створюємо runtime-образ
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Вказуємо команду запуску
ENTRYPOINT ["dotnet", "projekt zespolowy.dll"]

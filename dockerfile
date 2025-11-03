# Етап 1: Збірка
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копіюємо .sln і .csproj файли
COPY "projekt zespolowy.sln" .
COPY "projekt zespolowy/projekt zespolowy.csproj" "projekt zespolowy/"

# Запускаємо restore (відновлення пакетів)
RUN dotnet restore "projekt zespolowy.sln"

# Копіюємо ВЕСЬ код
COPY . .

# Публікуємо (компілюємо) додаток
RUN dotnet publish "projekt zespolowy/projekt zespolowy.csproj" -c Release -o /app/publish

# Етап 2: Запуск
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Тут ми вказуємо правильну назву .dll (з пробілом!)
ENTRYPOINT ["dotnet", "projekt zespolowy.dll"]

Кохана, [03.11.2025 17:22]
projekt zespolowy/projekt zespolowy.csproj

Кохана, [03.11.2025 18:06]
# Етап 1: Збірка
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копіюємо .sln і .csproj файли
COPY "projekt zespolowy.sln" .
COPY "projekt zespolowy/projekt zespolowy.csproj" "projekt zespolowy/"

# Копіюємо решту файлів проекту (але не весь код)
COPY "projekt zespolowy/." "projekt zespolowy/"

# Запускаємо restore (відновлення пакетів)
RUN dotnet restore "projekt zespolowy/projekt zespolowy.csproj"

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

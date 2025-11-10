using System;
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Додаємо CORS для Netlify ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNetlify", policy =>
    {
        policy.WithOrigins(
            "https://kfcbestfood.netlify.app",   // твій Netlify-домен
            "http://localhost:3000"                // локальний фронтенд для тестів
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// --- 2. Налаштування Kestrel (Railway) ---
builder.WebHost.ConfigureKestrel(options =>
{
    var port = int.Parse(Environment.GetEnvironmentVariable("PORT") ?? "5000");
    options.ListenAnyIP(port);
});

// --- 3. Підключення до БД ---
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
    // Railway дає postgres://user:pass@host:port/db
    var uri = new Uri(databaseUrl);
    var userInfo = uri.UserInfo.Split(':');

    connectionString =
        $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
}
else
{
    // Локально беремо з appsettings.json
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// --- 4. Controllers + Swagger ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 5. Автоматичні міграції ---
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<DataContext>();
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Помилка при застосуванні міграцій");
    }
}

// --- 6. Middleware ---
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Projekt Zespolowy API v1");
    c.RoutePrefix = string.Empty; // Swagger на корені сайту
});

// Використовуємо політику CORS для Netlify
app.UseCors("AllowNetlify");

app.UseAuthorization();
app.MapControllers();

app.Run();
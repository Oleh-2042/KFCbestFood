using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Додаємо CORS ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

// Якщо ми запускаємо локально (не на Railway), візьмемо її з appsettings
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}
// --- Кінець нового коду ---
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// Додаємо контролери та Swagger (для документації API)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Автоматичне застосування міграцій при старті (опціонально, але зручно для деплою)
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
        // Не кидаємо далі — лог збережено, додаткову обробку можна додати за потреби
    }
}

// Налаштування для development

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "KFCbestFood API v1");
    c.RoutePrefix = string.Empty; // Показати Swagger на корені сайту
});

app.UseHttpsRedirection();

// --- 3. Вмикаємо CORS ---
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
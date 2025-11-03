// Program.cs
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Додаємо CORS ---
// Це дозволить нашому HTML/JS спілкуватися з API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// --- 2. Додаємо Контекст Бази Даних (DbContext) ---
// Ми використовуємо SQLite, файл називатиметься 'database.db'
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Додаємо контролери та Swagger (для документації API)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Налаштування для production та development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// --- 3. Вмикаємо CORS ---
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
// Файл: Data/DataContext.cs
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Models; // <-- ОСЬ ТУТ БУЛА ПОМИЛКА

namespace projekt_zespolowy.Data // <-- І ОСЬ ТУТ
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        // Це посилається на клас "Produkt" з файлу Product.cs
        public DbSet<Produkt> Produkty { get; set; }
    }
}
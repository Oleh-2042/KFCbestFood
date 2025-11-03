// Файл: Models/Product.cs
using System.ComponentModel.DataAnnotations;

namespace projekt_zespolowy.Models // <-- ОСЬ ТУТ БУЛА ПОМИЛКА
{
    // Я назвав клас "Produkt", бо ти так використовував його в DataContext.
    // Це назва класу, а не назва файлу.
    public class Produkt
    {
        public int Id { get; set; }

        [Required]
        public string? Nazwa { get; set; }

        [Required]
        public decimal Cena { get; set; }

        public string? Kategoria { get; set; }

        public int StanMagazynu { get; set; }
    }
}
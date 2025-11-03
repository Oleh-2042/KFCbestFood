using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Data;
using projekt_zespolowy.Models;

[Route("api/[controller]")]
[ApiController]
public class ProduktyController : ControllerBase
{
    private readonly DataContext _context;

    public ProduktyController(DataContext context)
    {
        _context = context;
    }

    // --- 1. CREATE ---
    [HttpPost] // <-- ПЕРЕВІР, ЧИ Є ЦЯ МІТКА
    public async Task<ActionResult<Produkt>> CreateProdukt(Produkt produkt)
    {
        _context.Produkty.Add(produkt);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProdukt), new { id = produkt.Id }, produkt);
    }

    // --- 2. READ (всі) ---
    [HttpGet] // <-- Ця у тебе є, бо Swagger її бачить
    public async Task<ActionResult<IEnumerable<Produkt>>> GetProdukty()
    {
        return await _context.Produkty.ToListAsync();
    }

    // --- 3. READ (один) ---
    [HttpGet("{id}")] // <-- ПЕРЕВІР, ЧИ Є ЦЯ МІТКА
    public async Task<ActionResult<Produkt>> GetProdukt(int id)
    {
        var produkt = await _context.Produkty.FindAsync(id);
        if (produkt == null)
        {
            return NotFound("Продукт не знайдено");
        }
        return Ok(produkt);
    }

    // --- 4. UPDATE ---
    [HttpPut("{id}")] // <-- ПЕРЕВІР, ЧИ Є ЦЯ МІТКА
    public async Task<IActionResult> UpdateProdukt(int id, Produkt produkt)
    {
        if (id != produkt.Id)
        {
            return BadRequest("ID не співпадають");
        }
        _context.Entry(produkt).State = EntityState.Modified;
        await _context.SaveChangesAsync(); // (Тут у мене був try/catch, але це теж спрацює)
        return Ok("Продукт успішно оновлено");
    }

    // --- 5. DELETE ---
    [HttpDelete("{id}")] // <-- ПЕРЕВІР, ЧИ Є ЦЯ МІТКА
    public async Task<IActionResult> DeleteProdukt(int id)
    {
        var produkt = await _context.Produkty.FindAsync(id);
        if (produkt == null)
        {
            return NotFound("Продукт не знайдено");
        }
        _context.Produkty.Remove(produkt);
        await _context.SaveChangesAsync();
        return Ok("Продукт видалено");
    }
}
// --- script.js ---

const apiUrl = 'https://kfcbestfood-production.up.railway.app/api/Produkty';

const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');
const clearButton = document.getElementById('clearForm');

// Поля форми
const productId = document.getElementById('productId');
const nazwa = document.getElementById('nazwa');
const cena = document.getElementById('cena');
const kategoria = document.getElementById('kategoria');
const stanMagazynu = document.getElementById('stan_magazynu');

// Функція 1: Завантажити та відобразити всі продукти
async function fetchProdukty() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const produkty = await response.json();

        tableBody.innerHTML = ''; // Очищуємо таблицю
        produkty.forEach(p => {
            const row = `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nazwa}</td>
                    <td>${p.cena.toFixed(2)} zł</td>
                    <td>${p.kategoria || ''}</td>
                    <td>${p.stanMagazynu || 0}</td>
                    <td>
                        <button class="edit-btn" onclick="editProdukt(${p.id}, '${p.nazwa}', ${p.cena}, '${p.kategoria || ''}', ${p.stanMagazynu || 0})">Edytuj</button>
                        <button class="delete-btn" onclick="deleteProdukt(${p.id})">Usuń</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Błąd ładowania produktów:", error);
        alert("Nie udało się załadować produktów. Sprawdź, czy serwer API działa.");
    }
}

// Функція 2: Обробка відправки форми (Створення або Оновлення)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = productId.value;
    const data = {
        id: id ? parseInt(id) : 0,
        nazwa: nazwa.value,
        cena: parseFloat(cena.value),
        kategoria: kategoria.value,
        stanMagazynu: parseInt(stanMagazynu.value) || 0
    };

    if (isNaN(data.cena)) data.cena = 0;
    if (isNaN(data.stanMagazynu)) data.stanMagazynu = 0;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Błąd zapisu:", errorData);
            alert(`Błąd zapisu: ${JSON.stringify(errorData.errors)}`);
            return;
        }

        clearForm();
        await fetchProdukty();

    } catch (error) {
        console.error("Błąd zapisywania produktu:", error);
        alert("Błąd zapisywania produktu.");
    }
});

// Функція 3: Видалення продукту
async function deleteProdukt(id) {
    if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            await fetchProdukty();
        } catch (error) {
            console.error("Błąd usuwania produktu:", error);
            alert("Błąd usuwania produktu.");
        }
    }
}

// Функція 4: Підготовка форми до редагування
window.editProdukt = (id, nazwaVal, cenaVal, kategoriaVal, stanVal) => {
    productId.value = id;
    nazwa.value = nazwaVal;
    cena.value = cenaVal;
    kategoria.value = kategoriaVal || '';
    stanMagazynu.value = stanVal || 0;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('nazwa').focus();
}

// Функція 5: Очищення форми
function clearForm() {
    productId.value = '';
    form.reset();
}
clearButton.addEventListener('click', clearForm);

// Завантажуємо продукти при першому відкритті сторінки
document.addEventListener('DOMContentLoaded', fetchProdukty);

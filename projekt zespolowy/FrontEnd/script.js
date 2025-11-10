const apiUrl = 'https://kfcbestfood-production.up.railway.app/api/Produkty';

const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');
const clearButton = document.getElementById('clearForm');

const productId = document.getElementById('productId');
const nazwa = document.getElementById('nazwa');
const cena = document.getElementById('cena');
const kategoria = document.getElementById('kategoria');
const stanMagazynu = document.getElementById('stan_magazynu');

// Завантажити продукти
async function fetchProdukty() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${ response.status}`);
        const produkty = await response.json();

        tableBody.innerHTML = '';
        produkty.forEach(p => {
            const row = `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nazwa}</td>
                    <td>${p.cena.toFixed(2)} zł</td>
                    <td>${p.kategoria}</td>
                    <td>${p.stanMagazynu}</td>
                    <td>
                        <button class="edit-btn" onclick="editProdukt(${p.id}, '${p.nazwa}', ${p.cena}, '${p.kategoria}', ${p.stanMagazynu})">Edytuj</button>
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

// Обробка форми
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

    const method = id ? 'PUT' : 'POST';
    const response = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        fetchProdukty();
        clearForm();
    } else {
        alert("Nie udało się zapisać produktu.");
    }
});

// Редагування
function editProdukt(id, nazwaVal, cenaVal, kategoriaVal, stanVal) {
    productId.value = id;
    nazwa.value = nazwaVal;
    cena.value = cenaVal;
    kategoria.value = kategoriaVal;
    stanMagazynu.value = stanVal;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    nazwa.focus();
}

// Видалення
async function deleteProdukt(id) {
    if (!confirm(`
Czy na pewno chcesz usunąć produkt o ID: ${ id} ?`
)
) {
        return;
    }

    try {
        const response = await fetch(const apiUrl = 'https://kfcbestfood-production.up.railway.app/api/Produkty';

const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');
const clearButton = document.getElementById('clearForm');

const productId = document.getElementById('productId');
const nazwa = document.getElementById('nazwa');
const cena = document.getElementById('cena');
const kategoria = document.getElementById('kategoria');
const stanMagazynu = document.getElementById('stan_magazynu');

// Завантажити продукти
async function fetchProdukty() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${ response.status}`);
        const produkty = await response.json();

        tableBody.innerHTML = '';
        produkty.forEach(p => {
            const row = `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nazwa}</td>
                    <td>${p.cena.toFixed(2)} zł</td>
                    <td>${p.kategoria}</td>
                    <td>${p.stanMagazynu}</td>
                    <td>
                        <button class="edit-btn" onclick="editProdukt(${p.id}, '${p.nazwa}', ${p.cena}, '${p.kategoria}', ${p.stanMagazynu})">Edytuj</button>
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

// Обробка форми
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

    const method = id ? 'PUT' : 'POST';
    const response = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        fetchProdukty();
        clearForm();
    } else {
        alert("Nie udało się zapisać produktu.");
    }
});

// Редагування
function editProdukt(id, nazwaVal, cenaVal, kategoriaVal, stanVal) {
    productId.value = id;
    nazwa.value = nazwaVal;
    cena.value = cenaVal;
    kategoria.value = kategoriaVal;
    stanMagazynu.value = stanVal;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    nazwa.focus();
}

// Видалення
async function deleteProdukt(id) {
    if (!confirm(`
Czy na pewno chcesz usunąć produkt o ID: ${ id} ?`
)
) {
        return;
    }

    try {
        const response = await fetch(${ apiUrl } / ${ id }, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchProdukty();
        } else {
            alert("Nie udało się usunąć produktu.");
        }
    } catch (error) {
        console.error("Błąd usuwania:", error);
        alert("Wystąpił błąd podczas usuwania produktu.");
    }
}

// Очистити форму
function clearForm() {
    productId.value = '';
    form.reset();
}
clearButton.addEventListener('click', clearForm);

// Завантажити при старті
        document.addEventListener('DOMContentLoaded', fetchProdukty);`${ apiUrl} / ${id}`
, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchProdukty();
        } else {
            alert("Nie udało się usunąć produktu.");
        }
    } catch (error) {
        console.error("Błąd usuwania:", error);
        alert("Wystąpił błąd podczas usuwania produktu.");
    }
}

// Очистити форму
function clearForm() {
    productId.value = '';
    form.reset();
}
clearButton.addEventListener('click', clearForm);

// Завантажити при старті
document.addEventListener('DOMContentLoaded', fetchProdukty);
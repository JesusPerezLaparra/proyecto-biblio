const botonbusquedaLibro = document.getElementById("busquedaLibro");
let searchParam = "tolkien";
const books = [];

const API_URL = `https://openlibrary.org/search.json?q=${searchParam}`;

let pages = {
    current: `${API_URL}&limit=10`,
    prev: "",
    next: "",
};

const booksGrid = document.getElementById("booksGrid"); 

function showBooks() {
    fetch(pages.current)
        .then((response) => response.json())
        .then((data) => {
            booksGrid.innerHTML = ""; 
            data.docs.forEach((book) => {
                const card = document.createElement("div");
                card.classList.add("book-card");

                const img = document.createElement("img");
                img.src = book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150"; 
                img.alt = book.title;

                const title = document.createElement("h3");
                title.textContent = book.title;

                const author = document.createElement("p");
                author.textContent = `Autor: ${book.author_name ? book.author_name.join(", ") : "Desconocido"}`;

                const year = document.createElement("p");
                year.textContent = `Año: ${book.first_publish_year || "Desconocido"}`;

                const addButton = document.createElement("button");
                addButton.textContent = "Agregar al carrito";
                addButton.addEventListener("click", () => {
                    addToCart(book);
                });

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(author);
                card.appendChild(year);
                card.appendChild(addButton);

                booksGrid.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}

function addToCart(book) {
    console.log(`Libro agregado al carrito: ${book.title}`);
}

showBooks();



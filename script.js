const botonbusquedaLibro = document.getElementById("busquedaLibro");
let searchParam = "tolkien";
const books = [];
const btnCart = document.getElementById("cart");
const cartModal = document.getElementById("cartmodal");
const searchButton = document.getElementById("searchButton");
const btnBuy = document.getElementById("buy");


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

function searchBooks() {
    const searchInput = document.getElementById("busquedaLibro").value;
    const filter = document.getElementById("filtro").value;

    if (filter === "titulo") {
        searchParam = searchInput;
        pages.current = `https://openlibrary.org/search.json?title=${searchParam}&limit=10`;
    } else if (filter === "autor") {
        searchParam = searchInput;
        pages.current = `https://openlibrary.org/search.json?author=${searchParam}&limit=10`;
    }

    showBooks();
}

searchButton.addEventListener("click", searchBooks);

function addToCart(book) {
    books.push(book);
    updateCartUI();

    const listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.alignItems = "center";

    const img = document.createElement("img");
    img.src = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
        : "https://via.placeholder.com/50";
    img.alt = book.title;
    img.style.width = "50px";
    img.style.height = "auto";
    img.style.marginRight = "10px";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = book.title;

    const quantityContainer = document.createElement("div");
    quantityContainer.style.display = "flex";
    quantityContainer.style.alignItems = "center";
    quantityContainer.style.gap = "10px";
    quantityContainer.style.marginLeft = "auto";
    quantityContainer.style.marginInlineEnd = "5px";

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantitySpan.textContent, 10);
        if (currentQuantity > 1) {
            quantitySpan.textContent = currentQuantity - 1;
        } else {
            const index = books.indexOf(book);
            if (index > -1) {
                books.splice(index, 1);
                listItem.remove();
                updateCartUI();
            }
        }
    });

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = "1";

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantitySpan.textContent, 10);
        quantitySpan.textContent = currentQuantity + 1;
    });

    quantityContainer.appendChild(minusButton);
    quantityContainer.appendChild(quantitySpan);
    quantityContainer.appendChild(plusButton);

    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteIcon.style.cursor = "pointer";
    deleteIcon.addEventListener("click", () => {
        const index = books.indexOf(book);
        if (index > -1) {
            books.splice(index, 1);
            listItem.remove();
            updateCartUI();
        }
    });

    listItem.appendChild(img);
    listItem.appendChild(titleSpan);
    listItem.appendChild(quantityContainer);
    listItem.appendChild(deleteIcon);
    document.getElementById("cart-list").appendChild(listItem);
}

function updateCartUI() {
    const cartList = document.getElementById("cart-list");
    const cartheader = document.getElementById("cartheader");
    const buyButton = document.getElementById("buy");
    const cartCount = document.getElementById("cart-count");
    const cartBuyMessage = document.getElementById("cart-buy-message");
    const cartMessage = document.getElementById("cart-message");

    cartCount.textContent = books.length; // Actualiza el contador de artículos en el carrito

    if (books.length === 0) {
        cartBuyMessage.style.display = "none";
        cartMessage.style.display = "block";
    } else {
        cartBuyMessage.style.display = "block";
        cartMessage.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});


btnCart.addEventListener("click", () => {
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
});

btnBuy.addEventListener("click", () => {
    alert("Compra realizada con éxito!");
})


showBooks();
const botonbusquedaLibro = document.getElementById("busquedaLibro");
let searchParam = "tolkien";
const books = [];
const cartCount = document.getElementById("cart-count");
const btnCart = document.getElementById("cart");
const cartList = document.getElementById("cart-list");
const cartModal = document.getElementById("cartmodal");
const searchButton = document.getElementById("searchButton");
const cartheader = document.getElementById("cartheader");
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
    searchParam = document.getElementById("busquedaLibro").value; 
    pages.current = `https://openlibrary.org/search.json?title=${searchParam}&limit=10`;
    showBooks();
}

searchButton.addEventListener("click", searchBooks);

function addToCart(book) {
    books.push(book);
    const listItem = document.createElement("li");
    listItem.textContent = book.title;

    const quantityContainer = document.createElement("div");
    quantityContainer.style.display = "flex";
    quantityContainer.style.alignItems = "center";
    quantityContainer.style.gap = "10px";

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
                cartCount.textContent = books.length;
                listItem.remove();
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
            cartCount.textContent = books.length;
            listItem.remove();
        }
    });

    listItem.appendChild(quantityContainer);
    listItem.appendChild(deleteIcon);
    cartList.appendChild(listItem);
    cartCount.textContent = books.length;

    if (books.length > 0) {
        cartheader.style.display = "block";
    }
}

btnCart.addEventListener("click", () => {
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
});

btnBuy.addEventListener("click", () => {
    alert("Compra realizada con éxito!");
})
    

showBooks();
const botonbusquedaLibro = document.getElementById("busquedaLibro");
//let searchParam = botonbusquedaLibro.value;
let searchParam = "tolkien";
const books = [];

const API_URL = `https://openlibrary.org/search.json?q=${searchParam}`;

let pages = {
    current: `${API_URL}&limit=10`,
    prev: "",
    next: "",
};

function showBooks() {
    fetch(pages.current)
        .then((response) => response.json())
        .then((data) => {
            // booksGrid.innerHTML = "";
            data.docs.forEach((book) => {
                console.log(book);
            });
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}
showBooks();

console.log(API_URL);

function searchBooks () {
    const booktoSearch = botonbusquedaLibro.value.toLowerCase
    booktoSearch.addEventListener ("input", searchBooks)
    let search = ""
    if (booktoSearch) {
        search = "?title=" + booktoSearch;
    }
}

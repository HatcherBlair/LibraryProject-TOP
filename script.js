const myLibrary = [];

// Book object
function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

// Appends a book to the myLibrary array and updates the screen
function addBookToLibrary() {
    // Create the book
    newBook = new Book(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("num-pages").value,
        document.getElementById("read").checked
    );

    // Append book to library
    myLibrary.push(newBook);

    // Update the library
    updateBookCards();
}

// Redraws all the books in myLibrary array
function updateBookCards() {
    const bookContainer = document.querySelector(".book-container");

    // Remove current children from bookContainer
    bookContainer.innerHTML = '';

    // Create a book card and add it to container
    myLibrary.forEach(book => {
        bookCard = makeBookCard(book);

        // Add card to bookContainer
        bookContainer.appendChild(bookCard);
    })
}

// Creates HTML elements and returns a completed bookCard
function makeBookCard(book) {
    // Create the elements
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const numPages = document.createElement('p');
    const read = makeReadBtn(book);

    // Add content to elements
    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    numPages.textContent = `Number of pages: ${book.numPages}`;

    // Add children and classes to bookCard
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(numPages);
    bookCard.appendChild(read);

    return bookCard;
}

// creates the read button for the bookCard and returns it
function makeReadBtn(book) {
    const read = document.createElement('button');

    if (book.read) {
        read.textContent = "Already Read";
        read.style.backgroundColor = "green";
    } else {
        read.textContent = "Haven't Read Yet";
        read.style.backgroundColor = "red";
    }

    read.addEventListener('click', () => {
        book.read = !book.read;
        updateBookCards();
    })

    return read;
}

// Getting html elements
const addBook = document.querySelector(".add-book");
const formPopup = document.querySelector(".form-popup");
const closeForm = document.querySelector(".cancel-form");
const addBookForm = document.querySelector(".form-container");

// When Add book is clicked open the form
addBook.addEventListener('click', () => formPopup.classList.remove("hidden"));

// When close button is clicked, hide the form
closeForm.addEventListener('click', () => formPopup.classList.add("hidden"));

// Handle the submit button click
addBookForm.addEventListener("submit", (e) => {
    // Prevent default functionality (we don't want page to reload)
    e.preventDefault();

    // Add book to library and hide the form again
    addBookToLibrary();
    formPopup.classList.add("hidden");

    // Remove previous inputs
    const formInputs = document.querySelectorAll("input");
    formInputs.forEach( field => {
        field.value = "";
        field.checked = false;
    })
})
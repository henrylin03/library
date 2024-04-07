const booksSection = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector("dialog button");

const myLibrary = [
  {
    title: "Meditations",
    author: "Marcus Aurelius",
  },
  {
    title: "The Book of Five Rings",
    author: "Miyamoto Musashi",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
  },
];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary() {
  const title = prompt("What is the title of the book?");
  const author = prompt("Who is the author of the book?");

  const newBook = new Book(title, author);
  myLibrary.push(newBook);
}

function displayBooks() {
  function showDetails(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const bookName = document.createElement("strong");
    bookName.textContent = book.title;

    const authorName = document.createElement("small");
    authorName.textContent = book.author;

    bookDiv.appendChild(bookName);
    bookDiv.appendChild(authorName);
    booksSection.appendChild(bookDiv);
  }

  myLibrary.forEach((book) => showDetails(book));
}

displayBooks();
addBookButton.addEventListener("click", () => dialog.showModal());
closeDialogButton.addEventListener("click", () => dialog.close());

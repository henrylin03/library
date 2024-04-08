const booksSection = document.querySelector(".books");
const openDialogBtn = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const dialogConfirmBtn = document.querySelector("#submitBtn");
const dialogCancelBtn = document.querySelector("#cancelBtn");
const newBookTitleInput = document.querySelector("#title");
const newBookAuthorInput = document.querySelector("#author");

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

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = new Book(newBookTitleInput.value, newBookAuthorInput.value);
  myLibrary.push(newBook);
  console.log(newBook);
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
openDialogBtn.addEventListener("click", () => dialog.showModal());
dialogCancelBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", addBookToLibrary);

// todo: clicking elsewhere from modal closes modal

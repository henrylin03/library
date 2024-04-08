const booksSection = document.querySelector(".books");
const openDialogBtn = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const dialogConfirmBtn = document.querySelector("#submitBtn");
const dialogCancelBtn = document.querySelector("#cancelBtn");
const newBookTitleInput = document.querySelector("#title");
const newBookAuthorInput = document.querySelector("#author");

const myLibrary = [];
const toTitleCase = (str) =>
  str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");

// constructor
function Book(title, author, hasRead = false) {
  this.title = title;
  this.author = author;
  this.hasRead = hasRead;
}

function addBookToLibrary(e) {
  e.preventDefault();

  const newBook = new Book(
    toTitleCase(newBookTitleInput.value),
    toTitleCase(newBookAuthorInput.value)
  );
  myLibrary.push(newBook);

  dialog.close();
  displayBooks();
}

function removeBookFromLibrary(e) {
  const indexOfBookBeingRemoved = e.target.getAttribute("array-index");
  myLibrary.splice(indexOfBookBeingRemoved, 1);
  displayBooks();
}

function displayBooks() {
  const booksDivs = [];
  let bookIndex = 0;

  function createBookElement(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("array-index", bookIndex);

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "x";
    deleteBookBtn.classList.add("delete-book-button");
    deleteBookBtn.setAttribute("array-index", bookIndex);
    deleteBookBtn.addEventListener("click", removeBookFromLibrary);

    const bookName = document.createElement("strong");
    bookName.textContent = book.title;

    const authorName = document.createElement("small");
    authorName.textContent = book.author;

    // const hasRead = document.createElement("");

    bookDiv.appendChild(deleteBookBtn);
    bookDiv.appendChild(bookName);
    bookDiv.appendChild(authorName);
    booksDivs.push(bookDiv);

    bookIndex++;
  }

  myLibrary.forEach((book) => createBookElement(book));
  booksSection.replaceChildren(...booksDivs);
}

// add event listeners
openDialogBtn.addEventListener("click", () => dialog.showModal());
dialogCancelBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", addBookToLibrary);

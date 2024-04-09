const booksSection = document.querySelector(".books");
const openDialogBtn = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const dialogConfirmBtn = document.querySelector("#submitBtn");
const dialogCancelBtn = document.querySelector("#cancelBtn");
const newBookTitleInput = document.querySelector("#title");
const newBookAuthorInput = document.querySelector("#author");
const hasReadCheckboxInDialog = document.querySelector("#read-already");

const myLibrary = [];
const toTitleCase = (str) =>
  str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");

// constructor
function Book(title, author, hasRead) {
  this.title = title;
  this.author = author;
  this.hasRead = hasRead;
}

function addBookToLibrary(e) {
  e.preventDefault();

  const newBook = new Book(
    toTitleCase(newBookTitleInput.value),
    toTitleCase(newBookAuthorInput.value),
    hasReadCheckboxInDialog.checked
  );
  console.log(newBook);
  myLibrary.push(newBook);

  dialog.close();
  displayBooks();
}

function removeBookFromLibrary(e) {
  const indexOfBookBeingRemoved = e.target.getAttribute("array-index");
  myLibrary.splice(indexOfBookBeingRemoved, 1);
  displayBooks();
}

function toggleReadStatus(e) {
  const bookIndex = e.target.getAttribute("array-index");
  myLibrary[bookIndex].hasRead = !myLibrary[bookIndex].hasRead;
  e.target.classList.toggle("read");
  displayBooks();
}

function displayBooks() {
  const booksDivs = [];
  let bookIndex = 0;

  function createBookElement(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("array-index", bookIndex);
    if (book.hasRead) bookDiv.classList.add("read");

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "x";
    deleteBookBtn.classList.add("delete-book-button");
    deleteBookBtn.setAttribute("array-index", bookIndex);
    deleteBookBtn.addEventListener("click", removeBookFromLibrary);

    const bookNameDiv = document.createElement("div");
    const checkIconContainer = document.createElement("figure");
    const checkIconSvg =
      '<svg  xmlns="http://www.w3.org/2000/svg"  width="100%"  height="100%"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>';
    const bookName = document.createElement("h3");
    bookNameDiv.classList.add("book-name");
    checkIconContainer.innerHTML = checkIconSvg;
    bookName.textContent = book.title;

    const authorName = document.createElement("small");
    authorName.textContent = book.author;

    const hasReadDiv = document.createElement("div");
    hasReadDiv.classList.add("read-status-container");
    const readBtn = document.createElement("button");
    readBtn.setAttribute("type", "button");
    readBtn.setAttribute("array-index", bookIndex);
    readBtn.classList.add("read-btn");
    readBtn.textContent = "I've read this";
    readBtn.addEventListener("click", toggleReadStatus);
    hasReadDiv.appendChild(readBtn);

    bookNameDiv.appendChild(checkIconContainer);
    bookNameDiv.appendChild(bookName);
    bookDiv.appendChild(deleteBookBtn);
    bookDiv.appendChild(bookNameDiv);
    bookDiv.appendChild(authorName);
    bookDiv.appendChild(hasReadDiv);
    booksDivs.push(bookDiv);

    bookIndex++;
  }

  myLibrary.forEach((book) => createBookElement(book));
  booksSection.replaceChildren(...booksDivs);
}

// attach event listeners
openDialogBtn.addEventListener("click", () => dialog.showModal());
dialogCancelBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", addBookToLibrary);

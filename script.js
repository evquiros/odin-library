const btnAdd = document.querySelector('.btnAdd');

const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
const btnSubmit = document.querySelector('.submit');

const books = document.querySelector('.books');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBook() {
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = inputPages.value;
    const read = inputRead.checked;

    let newBook = new Book(title, author, pages, read);
    
    addBookToLibrary(newBook);

    modal.close();
    form.reset();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    books.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('p');
        title.classList.add('title');
        title.innerHTML = `${book.title}`;

        const author = document.createElement('p');
        author.classList.add('author');
        author.innerHTML = `${book.author}`;

        const pages = document.createElement('p');
        pages.classList.add('pages');
        pages.innerHTML = `${book.pages} pages`;

        const btnRead = document.createElement('button');
        btnRead.classList.add('btnCard', book.read ? 'read' : 'notRead'); 
        btnRead.innerHTML = book.read ? 'Read' : 'Not Read';
        btnRead.addEventListener('click', () => {
            btnRead.classList.toggle('notRead');
            btnRead.classList.toggle('read');
            btnRead.innerHTML = btnRead.classList.contains('read') ? 'Read' : 'Not Read';
        });

        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btnCard', 'remove');
        btnRemove.innerHTML = 'Remove';
        btnRemove.addEventListener('click', () => {
            removeBook(book);
        });

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(btnRead);
        card.appendChild(btnRemove);

        books.appendChild(card);
    });
}

function removeBook(bookToRemove) {
    myLibrary = myLibrary.filter(book => book !== bookToRemove);
    displayBooks();
}

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    createBook();
});

btnAdd.addEventListener('click', () => {
    modal.showModal();
});

modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        form.reset();
        modal.close();
    }
});

displayBooks();
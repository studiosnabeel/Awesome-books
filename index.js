// Book Class: Represents a Book
// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// eslint-disable-next-line max-classes-per-file
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI Tasks

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.book-list');

    const div = document.createElement('div');
    div.classList.add('book-item');

    div.innerHTML = `
    <p class='book-p1'>"${book.title}"</p>
    <p class='book-p1'>by ${book.author}</p>
    <button class='delete'>Remove</button>
  `;

    list.appendChild(div);
  }

  // remove function
  static removeBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.remove();
    }
  }

  static clearfields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// One page App code

class Switch {
  static changeForm(key) {
    const bookContainer = document.querySelector('.container');
    const awesomeForm = document.querySelector('.form');
    const contactForm = document.querySelector('.contact');
    const linkOne = document.querySelector('#nav-booklist');
    const linkTwo = document.querySelector('#nav-addnew');
    const linkThree = document.querySelector('#nav-contact');

    if (key === 'List') {
      bookContainer.style.display = 'block';
      awesomeForm.style.display = 'none';
      contactForm.style.display = 'none';
      linkOne.style.color = 'tomato';
      linkTwo.style.color = 'black';
      linkThree.style.color = 'black';
    } else if (key === 'Add new') {
      bookContainer.style.display = 'none';
      awesomeForm.style.display = 'block';
      contactForm.style.display = 'none';
      linkTwo.style.color = 'tomato';
      linkOne.style.color = 'black';
      linkThree.style.color = 'black';
    } else {
      bookContainer.style.display = 'none';
      awesomeForm.style.display = 'none';
      contactForm.style.display = 'block';
      linkThree.style.color = 'tomato';
      linkOne.style.color = 'black';
      linkTwo.style.color = 'black';
    }
  }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book

document.querySelector('.awesome-form').addEventListener('submit', (e) => {
  // Prevent the actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Instantiate book
  const book = new Book(title, author);

  // Add Book to UI
  UI.addBookToList(book);

  Store.addBook(book);

  // Clear fields

  UI.clearfields();
});

// Event: remove book

document.querySelector('.book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.removeBook(e.target);

  // Remove from Store
  Store.removeBook(e.target.previousElementSibling.textContent);
});

// Event listener for One Page app

document.querySelectorAll('.nav-a').forEach((link) => {
  link.addEventListener('click', () => {
    Switch.changeForm(link.textContent);
  });
});

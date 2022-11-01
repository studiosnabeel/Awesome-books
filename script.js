// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI Class: Handle UI Tasks

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: 'How to become a Software developer',
        author: 'Nabeel Akbar',
      },
      {
        title: 'How to be successful as Process Technician',
        author: 'Sane Myburg',
      },
      {
        title: 'Love at first sight',
        author: 'Precious Nhlapho',
      },
    ];
    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }
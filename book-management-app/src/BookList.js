import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from './BookContext';

function BookList() {
  const { books, deleteBook } = useBooks();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  return (
    <div className="book-list-container">
      <div className="welcome-message">
        <h2>Welcome to Book Management</h2>
        <p>Here you can manage your book collection. Add, edit, or delete books as needed.</p>
      </div>
      <h3 className="book-list-title">Book List</h3>
      {books.length === 0 ? (
        <p className="no-books-message">No books available. Add some books to get started!</p>
      ) : (
        <ul className="book-list">
          {books.map(book => (
            <li key={book.id} className="book-item">
              <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">by {book.author}</p>
              </div>
              <div className="book-actions">
                <Link to={`/edit/${book.id}`} className="btn btn-edit">
                  <i className="fas fa-edit"></i> Edit
                </Link>
                <button onClick={() => handleDelete(book.id)} className="btn btn-delete">
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add" className="btn btn-add">
        <i className="fas fa-plus"></i> Add New Book
      </Link>
    </div>
  );
}

export default BookList;
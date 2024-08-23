import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from './BookContext';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, editBook } = useBooks();

  const [book, setBook] = useState({ title: '', author: '' });

  useEffect(() => {
    const bookToEdit = books.find(b => b.id === parseInt(id));
    if (bookToEdit) {
      setBook(bookToEdit);
    } else {
      navigate('/');
    }
  }, [id, books, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook(parseInt(id), { title: book.title, author: book.author });
    alert(`Updated book: ${book.title} by ${book.author}`);
    navigate('/');
  };

  return (
    <div>
      <h2 className="my-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-save"></i> Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
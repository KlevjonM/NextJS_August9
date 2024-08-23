import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from './BookContext';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(title, author);
    alert(`Added book: ${title} by ${author}`);
    navigate('/');
  };

  return (
    <div>
      <h2 className="my-4">Add Book</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
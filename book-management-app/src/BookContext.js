import React, { createContext, useState, useContext } from 'react';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const addBook = (title, author) => {
    const newBook = {
      id: books.length + 1,
      title,
      author,
    };
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const editBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
  };

  return (
    <BookContext.Provider value={{ books, addBook, deleteBook, editBook }}>
      {children}
    </BookContext.Provider>
  );
};
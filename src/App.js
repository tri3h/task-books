import { useEffect, useState } from "react";
import CreateForm from "./components/CreateForm/CreateForm";
import BookCard from "./components/BookCard/BookCard";
import styles from "./App.module.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storageBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storageBooks);
  }, []);

  const addBook = (name, author, imageSrc) => {
    const newBooks = [...books, { name, author, imageSrc }];
    setBooks(newBooks);
    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  const editBook = (index) => {
    return (name, author, imageSrc) => {
      const newBooks = books.map((book, i) =>
        index === i ? { name, author, imageSrc } : book
      );
      setBooks(newBooks);
      localStorage.setItem("books", JSON.stringify(newBooks));
    };
  };

  const deleteBook = (index) => {
    return () => {
      const newBooks = books.filter((_, i) => index !== i);
      setBooks(newBooks);
      localStorage.setItem("books", JSON.stringify(newBooks));
    };
  };

  return (
    <main className={styles.main}>
      <h1>Демо-страница редактирования книг</h1>
      <CreateForm onAddClick={addBook} />
      {books.length === 0 ? (
        <p>В списке нет книг</p>
      ) : (
        <ul className={styles.list}>
          {books.map((book, index) => (
            <li key={index} className={styles.item}>
              <BookCard
                name={book.name}
                author={book.author}
                imageSrc={book.imageSrc}
                editBook={editBook(index)}
                deleteBook={deleteBook(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;

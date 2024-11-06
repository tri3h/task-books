import { useState } from "react";
import EditForm from "../EditForm/EditForm";
import styles from "./BookCard.module.css";

export default function BookCard({
  name,
  author,
  imageSrc,
  editBook,
  deleteBook,
}) {
  const [editable, setEditable] = useState(false);

  const onEditClick = () => {
    setEditable(true);
  };

  return (
    <div className={styles.container}>
      {imageSrc ? (
        <img src={imageSrc} width="145" height="205" />
      ) : (
        <div className={styles.noCover}>нет обложки</div>
      )}
      {editable ? (
        <EditForm
          initialName={name}
          initialAuthor={author}
          initialImageSrc={imageSrc}
          onEditClick={(name, author, imageSrc) => {
            editBook(name, author, imageSrc);
            setEditable(false);
          }}
        />
      ) : (
        <>
          <div>
            <p>
              Название: <span className={styles.name}>{name}</span>
            </p>
            <p>
              Автор: <span className={styles.name}>{author}</span>
            </p>
            <button className={styles.button} onClick={onEditClick}>
              Редактировать
            </button>
            <button className={styles.button} onClick={deleteBook}>
              Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
}

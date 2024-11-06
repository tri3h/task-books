import { useState } from "react";
import styles from "./EditForm.module.css";

export default function EditForm({
  initialName,
  initialAuthor,
  initialImageSrc,
  onEditClick,
}) {
  const [name, setName] = useState(initialName);
  const [author, setAuthor] = useState(initialAuthor);
  const [imageSrc, setImageSrc] = useState(initialImageSrc);

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="editName">Название</label>
        <input
          type="text"
          name="name"
          id="editName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="editAuthor">Автор</label>
        <input
          type="text"
          name="author"
          id="editAuthor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <input type="file" accept="image/*" onChange={onImageChange} />

      <button type="button" onClick={() => onEditClick(name, author, imageSrc)}>
        Сохранить
      </button>
    </form>
  );
}

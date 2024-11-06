import { useState } from "react";
import styles from "./CreateForm.module.css";

export default function CreateForm({ onAddClick }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

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
      <label htmlFor="name">Название</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="author">Автор</label>
      <input
        type="text"
        name="author"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={onImageChange} />
      <button type="button" onClick={() => onAddClick(name, author, imageSrc)}>
        Создать
      </button>
    </form>
  );
}

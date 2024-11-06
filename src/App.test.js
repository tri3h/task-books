import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

describe("", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  test("создается новая книга", () => {
    render(<App />);
    const nameInput = screen.getByLabelText("Название");
    const authorInput = screen.getByLabelText("Автор");
    const createButton = screen.getByText("Создать");

    fireEvent.change(nameInput, { target: { value: "моя книга" } });
    fireEvent.change(authorInput, { target: { value: "я" } });
    fireEvent.click(createButton);

    const nameElem = screen.getByText("моя книга");
    const authorElem = screen.getByText("я");
    const storageBooks = JSON.parse(localStorage.getItem("books"));
    expect(storageBooks).toEqual([
      {
        name: "моя книга",
        author: "я",
        imageSrc: null,
      },
    ]);
    expect(nameElem).toBeInTheDocument();
    expect(authorElem).toBeInTheDocument();
  });

  test("удаляется созданная книга", () => {
    render(<App />);
    const nameInput = screen.getByLabelText("Название");
    const authorInput = screen.getByLabelText("Автор");
    const createButton = screen.getByText("Создать");

    fireEvent.change(nameInput, { target: { value: "моя книга" } });
    fireEvent.change(authorInput, { target: { value: "я" } });
    fireEvent.click(createButton);

    const deleteButton = screen.getByText("Удалить");
    fireEvent.click(deleteButton);

    const nameElem = screen.queryByText("моя книга");
    const authorElem = screen.queryByText("я");
    const storageBooks = JSON.parse(localStorage.getItem("books"));
    expect(storageBooks).toEqual([]);
    expect(nameElem).not.toBeInTheDocument();
    expect(authorElem).not.toBeInTheDocument();
  });
});

test("изменяются поля книги при редактировании", () => {
  render(<App />);
  const nameInput = screen.getByLabelText("Название");
  const authorInput = screen.getByLabelText("Автор");
  const createButton = screen.getByText("Создать");

  fireEvent.change(nameInput, { target: { value: "моя книга" } });
  fireEvent.change(authorInput, { target: { value: "я" } });
  fireEvent.click(createButton);

  const editButton = screen.getByText("Редактировать");
  fireEvent.click(editButton);

  const editNameInput = screen.getAllByLabelText("Название")[1];
  const editAuthorInput = screen.getAllByLabelText("Автор")[1];

  fireEvent.change(editNameInput, { target: { value: "моя книга 2" } });
  fireEvent.change(editAuthorInput, { target: { value: "я 2" } });

  const saveEditButton = screen.getByText("Сохранить");
  fireEvent.click(saveEditButton);

  const oldNameElem = screen.queryByText("моя книга");
  const oldAuthorElem = screen.queryByText("я");
  const nameElem = screen.getByText("моя книга 2");
  const authorElem = screen.getByText("я 2");
  const storageBooks = JSON.parse(localStorage.getItem("books"));
  expect(storageBooks).toEqual([
    {
      name: "моя книга 2",
      author: "я 2",
      imageSrc: null,
    },
  ]);
  expect(nameElem).toBeInTheDocument();
  expect(authorElem).toBeInTheDocument();
  expect(oldNameElem).not.toBeInTheDocument();
  expect(oldAuthorElem).not.toBeInTheDocument();
});

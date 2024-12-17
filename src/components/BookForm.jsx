import { useState } from "react";
import bookService from "../services/bookService";

export function BookForm({books, setBooks}) {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
  })

  function resetFormValues() {
    setFormValues({
      title: '',
      author: '',
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();

    const newBookData = {
      title: formValues.title,
      author: formValues.author,
    }

    const newBook = await bookService.addBook(newBookData);
    setBooks(books.concat(newBook));
    resetFormValues();
  }
  
  return (
    <form action="" method="post" onSubmit={handleSubmit}>
      <label htmlFor="title"><strong>Title: </strong></label>
      <input 
        type="text"
        name="title"
        id="title"
        value={formValues.title}
        onChange={e => setFormValues({...formValues, title: e.target.value})}
      />
      <label htmlFor="author"><strong>Author: </strong></label>
      <input 
        type="text"
        name="author"
        id="author"
        value={formValues.author}
        onChange={e => setFormValues({...formValues, author: e.target.value})}
      />
      <input type="submit" value="Add Book" />
    </form>
  );
}
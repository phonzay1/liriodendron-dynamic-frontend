import { useEffect, useState } from 'react';
import './App.css'
import bookService from './services/bookService';
import userService from './services/userService';
import { User } from './components/User';
import { Book } from './components/Book';
import { BookForm } from './components/BookForm';
import { UserForm } from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    userService
      .getAllUsers()
      .then(users => setUsers(users));
  }, [])

  useEffect(() => {
    bookService
      .getAllBooks()
      .then(books => setBooks(books));
  }, [])

  return (
    <>
      <h2>Users (MongoDB)</h2>
      <UserForm users={users} setUsers={setUsers} />
      <ul>
        {users.map(({ _id, name, favoriteAnimal }) => 
            <User key={_id} name={name} favoriteAnimal={favoriteAnimal}/>
        )}
      </ul>
      <h2>Books (PostgreSQL)</h2>
      <BookForm books={books} setBooks={setBooks} />
      <ul>
        {books.map(({ id, title, author }) => 
            <Book key={id} title={title} author={author}/>
        )}
      </ul>
    </>
  )
}

export default App

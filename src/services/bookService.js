import axios from 'axios';

const baseURL = '/api/books';

async function addBook(newBook) {
  const response = await axios.post(baseURL, newBook);
  return response.data;
}

async function getAllBooks() {
  const response = await axios.get(baseURL);
  return response.data;
}

export default {
  addBook,
  getAllBooks,
};
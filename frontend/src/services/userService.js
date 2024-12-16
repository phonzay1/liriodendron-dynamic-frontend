import axios from 'axios';

const baseURL = '/api/users';

async function addUser(newUser) {
  const response = await axios.post(baseURL, newUser);
  return response.data;
}

async function getAllUsers() {
  const response = await axios.get(baseURL);
  return response.data;
}

export default {
  addUser,
  getAllUsers,
};
const express = require('express');
const { connectMongoDB, createPGTable, pgQueries } = require('./config/db');
const MongoUser = require('./models/mongoUser');

const app = express();
app.use(express.json());

// Connect to databases
connectMongoDB();
createPGTable();

// MongoDB Routes
app.post('/api/users', async (req, res) => {
  try {
    const { name, favoriteAnimal } = req.body;
    const newUser = new MongoUser({ name, favoriteAnimal });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send();
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await MongoUser.find();
    res.json(users);
  } catch (error) {
    res.status(500).send();
  }
});

// PostgreSQL Routes
app.post('/api/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await pgQueries.addBook(title, author);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).send();
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await pgQueries.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! :)`);
});
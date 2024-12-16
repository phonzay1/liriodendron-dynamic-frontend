const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/vps-dynamic-app');
    console.log('MongoDB connected! :)');
  } catch (error) {
    console.error('MongoDB connection error :( ', error?.message);
  }
};

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_PG_USER,
  host: process.env.DB_PG_HOST,
  database: process.env.DB_PG_NAME,
  password: process.env.DB_PG_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

// Create PostgreSQL table
const createPGTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      author VARCHAR(100) NOT NULL
    )
  `;

  try {
    const client = await pool.connect();
    console.log('pg pool connected! :)');
    await client.query(createTableQuery);
    client.release();
    console.log('PostgreSQL table created :)');
  } catch (error) {
    console.error('Error creating PostgreSQL table :( ', error?.message);
  }
};

// PostgreSQL Methods
const pgQueries = {
  async addBook(title, author) {
    const query = 'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *';
    try {
      const result = await pool.query(query, [title, author]);
      console.log('book added to PG: ', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error adding book to PostgreSQL:', error?.message);
      throw error;
    }
  },

  async getAllBooks() {
    const query = 'SELECT * FROM books ORDER BY title ASC';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching books from PostgreSQL:', error?.message);
      throw error;
    }
  }
};

module.exports = {
  connectMongoDB,
  createPGTable,
  pgQueries
};
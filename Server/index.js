const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Books-Data',
  password: 'Postgres',
  port: 5432,
});

// ========== Your existing route ==========
app.get('/api/matched-books', async (req, res) => {
  try {
    const bookId = req.query.id;

    if (bookId) {
      const result = await pool.query('SELECT * FROM matched_books WHERE id = $1', [bookId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.json(result.rows);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;

    const totalRes = await pool.query('SELECT COUNT(*) FROM matched_books');
    const totalBooks = parseInt(totalRes.rows[0].count);

    const { rows } = await pool.query(
      'SELECT * FROM matched_books OFFSET $1 LIMIT $2',
      [offset, limit]
    );

    res.json({
      books: rows,
      total: totalBooks,
      page,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error('Error fetching matched_books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ========== PayMongo route ==========
app.post('/api/create-payment', async (req, res) => {
  const { amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.paymongo.com/v1/payment_intents',
      {
        data: {
          attributes: {
            amount: amount * 100, // centavos
            payment_method_allowed: ['card', 'gcash'],
            payment_method_types: ['card'],
            currency: 'PHP',
          },
        },
      },
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(process.env.PAYMONGO_SECRET + ':').toString('base64'),
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('PayMongo Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment intent creation failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'AllBook-DB',
  password: 'Postgres',
  port: 5432,
});

app.get('/catalogue', async (req, res) => {
    try {
      const result = await pool.query('SELECT id, title, price, image FROM catalogue');
      res.json(result.rows);
    } catch (err) {
      console.error('DB Query Error:', err);
      res.status(500).json({ error: err.message });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

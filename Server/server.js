const express = require('express');
const cors = require('cors');
const app = express();

const booksRoutes = require('./routes/book');

app.use(cors());
app.use(express.json());

app.use('/books', booksRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

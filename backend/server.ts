import express from 'express';
import cors from 'cors';
import booksRoutes from './routes/books.routes';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});

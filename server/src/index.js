import 'dotenv/config';
import cors from 'cors';
import './database/index';
import express from 'express';
import authRoutes from './routes/auth.routes'
import candidateRoutes from './routes/candidate.routes'
import votesRoutes from './routes/vote.routes'

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' }).status(200);
});

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/candidate', candidateRoutes)
app.use('/api/v1/vote', votesRoutes)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
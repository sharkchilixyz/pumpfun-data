import express from 'express';
import webhookRoutes from './routes/route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/webhook', webhookRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something broke!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
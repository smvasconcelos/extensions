import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

export default app;

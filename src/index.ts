import './config/database';
import app from './config/app';
import manhwaRoutes from './routes/manhwa.routes';
import historyRoutes from './routes/history.routes';

app.use('/', manhwaRoutes);
app.use('/', historyRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

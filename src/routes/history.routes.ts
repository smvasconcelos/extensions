import { Router, Request, Response } from 'express';
import { HistoryController } from '../controller/history.controller';

const router = Router();
const controller = new HistoryController();

router.get('/add_history', (req: Request, res: Response) => controller.addHistory(req, res));
router.post('/remove_history', (req: Request, res: Response) => controller.removeHistory(req, res));
router.get('/get_history', (req: Request, res: Response) => controller.getHistory(req, res));

export default router;

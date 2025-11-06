import { Router, Request, Response } from 'express';
import { ManhwaController } from '../controller/manhwa.controller';

const router = Router();
const controller = new ManhwaController();

router.get('/check_and_create_user', (req: Request, res: Response) => controller.checkAndCreateUser(req, res));
router.post('/add_manhwa', (req: Request, res: Response) => controller.addManhwa(req, res));
router.post('/remove_manhwa', (req: Request, res: Response) => controller.removeManhwa(req, res));
router.get('/get_manhwa', (req: Request, res: Response) => controller.getManhwa(req, res));

export default router;

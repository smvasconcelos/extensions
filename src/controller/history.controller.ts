import { Request, Response } from 'express';
import { HistoryService } from '../service/history.service';
import {
	ApiResponse,
	RemoveHistoryRequestBody,
	TypedRequest,
	TypedResponse,
} from '../types/api.types';
import { HistoryCollection } from '../types/manhwa.types';

export class HistoryController {
	private service: HistoryService;

	constructor() {
		this.service = new HistoryService();
	}

	async addHistory(req: Request, res: Response): Promise<void> {
		try {
			const title = req.query.url as string | undefined;
			const email = req.query.email as string | undefined;

			if (!email || !title) {
				const response: ApiResponse<never> = {
					message: 'Email and url are required',
					status: 400,
				};
				res.status(400).json(response);
				return;
			}

			await this.service.addHistory(email, title);

			const response: ApiResponse<never> = {
				message: 'History added successfully',
				status: 201,
			};
			res.status(201).json(response);
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'Error adding history',
				status: 500,
				error: err,
			};
			res.status(500).json(response);
		}
	}

	async removeHistory(
		req: TypedRequest<RemoveHistoryRequestBody>,
		res: TypedResponse<never>
	): Promise<void> {
		try {
			const { data, email } = req.body;

			if (!email || !data) {
				const response: ApiResponse<never> = {
					message: 'Email and data are required',
					status: 400,
				};
				res.status(400).json(response);
				return;
			}

			await this.service.removeHistory(email, data);

			const response: ApiResponse<never> = {
				message: 'History removed successfully',
				status: 201,
			};
			res.status(201).json(response);
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'Error removing history',
				status: 500,
				error: err,
			};
			res.status(500).json(response);
		}
	}

	async getHistory(req: Request, res: Response): Promise<void> {
		try {
			const email = req.query.email as string | undefined;

			if (!email) {
				const response: ApiResponse<never> = {
					message: 'Email is required',
					status: 400,
				};
				res.status(400).json(response);
				return;
			}

			const data: HistoryCollection = await this.service.getHistory(email);

			const response: ApiResponse<HistoryCollection> = {
				message: 'History listed successfully',
				status: 200,
				data: data,
			};
			res.status(200).json(response);
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'Error listing history',
				status: 500,
				error: err,
			};
			res.status(500).json(response);
		}
	}
}

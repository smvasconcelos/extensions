import { Request, Response } from 'express';
import { ManhwaService } from '../service/manhwa.service';
import {
	ApiResponse,
	AddManhwaRequestBody,
	RemoveManhwaRequestBody,
	TypedRequest,
	TypedResponse,
} from '../types/api.types';
import { ManhwaCollection } from '../types/manhwa.types';

export class ManhwaController {
	private service: ManhwaService;

	constructor() {
		this.service = new ManhwaService();
	}

	async checkAndCreateUser(req: Request, res: Response): Promise<void> {
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

			const userExists = await this.service.checkAndCreateUser(email);

			if (userExists) {
				const response: ApiResponse<never> = {
					message: 'User already exists',
					status: 200,
				};
				res.status(200).json(response);
			} else {
				const response: ApiResponse<never> = {
					message: 'Manhwa added successfully',
					status: 201,
				};
				res.status(201).json(response);
			}
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'User already exists',
				status: 200,
				error: err,
			};
			res.status(200).json(response);
		}
	}

	async addManhwa(req: TypedRequest<AddManhwaRequestBody>, res: TypedResponse<never>): Promise<void> {
		try {
			const { url, chapter, name, email, img, card } = req.body;

			if (!email) {
				const response: ApiResponse<never> = {
					message: 'Email is required',
					status: 400,
				};
				res.status(400).json(response);
				return;
			}

			await this.service.addManhwa(
				url || '',
				chapter || '',
				name || '',
				email,
				img || '',
				card || false
			);

			const response: ApiResponse<never> = {
				message: 'Manhwa added successfully',
				status: 201,
			};
			res.status(201).json(response);
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'Error adding manhwa',
				status: 500,
				error: err,
			};
			res.status(500).json(response);
		}
	}

	async removeManhwa(
		req: TypedRequest<RemoveManhwaRequestBody>,
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

			await this.service.removeManhwa(email, data);

			const response: ApiResponse<never> = {
				message: 'Manhwa removed successfully',
				status: 201,
			};
			res.status(201).json(response);
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'Error removing manhwa',
				status: 500,
				error: err,
			};
			res.status(500).json(response);
		}
	}

	async getManhwa(req: Request, res: Response): Promise<void> {
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

			const data: ManhwaCollection = await this.service.getManhwa(email);

			const response: ApiResponse<ManhwaCollection> = {
				message: 'Manhwa listed successfully',
				status: 200,
				data: data,
			};
			res.status(200).json(response);
		} catch (err) {
			const response: ApiResponse<never> = {
				message: 'Error listing manhwa',
				status: 500,
				error: err,
			};
			res.status(500).json(response);
		}
	}
}

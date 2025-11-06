import { Request, Response } from 'express';
import { ManhwaController } from '../manhwa.controller';
import { ManhwaService } from '../../service/manhwa.service';
import { Manhwa, ManhwaCollection } from '../../types/manhwa.types';
import { createMockRequest, createMockResponse, createMockManhwa } from '../../__tests__/mocks/express.mock';

jest.mock('../../service/manhwa.service');

describe('ManhwaController', () => {
	let controller: ManhwaController;
	let mockManhwaService: jest.Mocked<ManhwaService>;
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;

	beforeEach(() => {
		mockManhwaService = {
			checkAndCreateUser: jest.fn(),
			addManhwa: jest.fn(),
			removeManhwa: jest.fn(),
			getManhwa: jest.fn(),
		} as unknown as jest.Mocked<ManhwaService>;

		(ManhwaService as jest.Mock).mockImplementation(() => mockManhwaService);

		controller = new ManhwaController();

		mockResponse = createMockResponse();
	});

	describe('checkAndCreateUser', () => {
		it('should return 400 when email is missing', async () => {
			mockRequest = createMockRequest({ query: {} });

			await controller.checkAndCreateUser(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email is required',
				status: 400,
			});
		});

		it('should return 200 when user already exists', async () => {
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockManhwaService.checkAndCreateUser.mockResolvedValue(true);

			await controller.checkAndCreateUser(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'User already exists',
				status: 200,
			});
		});

		it('should return 201 when user is created', async () => {
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockManhwaService.checkAndCreateUser.mockResolvedValue(false);

			await controller.checkAndCreateUser(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Manhwa added successfully',
				status: 201,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockManhwaService.checkAndCreateUser.mockRejectedValue(new Error('Test error'));

			await controller.checkAndCreateUser(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'User already exists',
				status: 200,
				error: expect.any(Error),
			});
		});
	});

	describe('addManhwa', () => {
		it('should return 400 when email is missing', async () => {
			mockRequest = createMockRequest({ body: {} });

			await controller.addManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email is required',
				status: 400,
			});
		});

		it('should add manhwa successfully', async () => {
			mockRequest = createMockRequest({
				body: {
					url: 'https://example.com/manhwa',
					chapter: '1',
					name: 'Test Manhwa',
					email: 'test@example.com',
					img: 'https://example.com/image.jpg',
					card: false,
				},
			});
			mockManhwaService.addManhwa.mockResolvedValue(undefined);

			await controller.addManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockManhwaService.addManhwa).toHaveBeenCalledWith(
				'https://example.com/manhwa',
				'1',
				'Test Manhwa',
				'test@example.com',
				'https://example.com/image.jpg',
				false
			);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Manhwa added successfully',
				status: 201,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({
				body: {
					email: 'test@example.com',
				},
			});
			mockManhwaService.addManhwa.mockRejectedValue(new Error('Test error'));

			await controller.addManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Error adding manhwa',
				status: 500,
				error: expect.any(Error),
			});
		});
	});

	describe('removeManhwa', () => {
		const mockManhwa: Manhwa = createMockManhwa();

		it('should return 400 when email or data is missing', async () => {
			mockRequest = createMockRequest({ body: {} });

			await controller.removeManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email and data are required',
				status: 400,
			});
		});

		it('should remove manhwa successfully', async () => {
			mockRequest = createMockRequest({
				body: {
					email: 'test@example.com',
					data: mockManhwa,
				},
			});
			mockManhwaService.removeManhwa.mockResolvedValue(undefined);

			await controller.removeManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockManhwaService.removeManhwa).toHaveBeenCalledWith(
				'test@example.com',
				mockManhwa
			);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Manhwa removed successfully',
				status: 201,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({
				body: {
					email: 'test@example.com',
					data: mockManhwa,
				},
			});
			mockManhwaService.removeManhwa.mockRejectedValue(new Error('Test error'));

			await controller.removeManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Error removing manhwa',
				status: 500,
				error: expect.any(Error),
			});
		});
	});

	describe('getManhwa', () => {
		it('should return 400 when email is missing', async () => {
			mockRequest = createMockRequest({ query: {} });

			await controller.getManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email is required',
				status: 400,
			});
		});

		it('should return manhwa collection successfully', async () => {
			const mockData: ManhwaCollection = {
				manhwa: [createMockManhwa()],
				id: 'test-id',
			};
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockManhwaService.getManhwa.mockResolvedValue(mockData);

			await controller.getManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockManhwaService.getManhwa).toHaveBeenCalledWith('test@example.com');
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Manhwa listed successfully',
				status: 200,
				data: mockData,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockManhwaService.getManhwa.mockRejectedValue(new Error('Test error'));

			await controller.getManhwa(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Error listing manhwa',
				status: 500,
				error: expect.any(Error),
			});
		});
	});
});

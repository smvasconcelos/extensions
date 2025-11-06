import { Request, Response } from 'express';
import { HistoryController } from '../history.controller';
import { HistoryService } from '../../service/history.service';
import { HistoryCollection } from '../../types/manhwa.types';
import {
	createMockRequest,
	createMockResponse,
	createMockHistoryItem,
} from '../../__tests__/mocks/express.mock';

jest.mock('../../service/history.service');

describe('HistoryController', () => {
	let controller: HistoryController;
	let mockHistoryService: jest.Mocked<HistoryService>;
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;

	beforeEach(() => {
		mockHistoryService = {
			addHistory: jest.fn(),
			removeHistory: jest.fn(),
			getHistory: jest.fn(),
		} as unknown as jest.Mocked<HistoryService>;

		(HistoryService as jest.Mock).mockImplementation(() => mockHistoryService);

		controller = new HistoryController();

		mockResponse = createMockResponse();
	});

	describe('addHistory', () => {
		it('should return 400 when email is missing', async () => {
			mockRequest = createMockRequest({ query: { url: 'https://example.com/manhwa' } });

			await controller.addHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email and url are required',
				status: 400,
			});
		});

		it('should return 400 when url is missing', async () => {
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });

			await controller.addHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email and url are required',
				status: 400,
			});
		});

		it('should add history successfully', async () => {
			mockRequest = createMockRequest({
				query: {
					email: 'test@example.com',
					url: 'https://example.com/manhwa',
				},
			});
			mockHistoryService.addHistory.mockResolvedValue(undefined);

			await controller.addHistory(mockRequest as Request, mockResponse as Response);

			expect(mockHistoryService.addHistory).toHaveBeenCalledWith(
				'test@example.com',
				'https://example.com/manhwa'
			);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'History added successfully',
				status: 201,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({
				query: {
					email: 'test@example.com',
					url: 'https://example.com/manhwa',
				},
			});
			mockHistoryService.addHistory.mockRejectedValue(new Error('Test error'));

			await controller.addHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Error adding history',
				status: 500,
				error: expect.any(Error),
			});
		});
	});

	describe('removeHistory', () => {
		const mockHistoryItem = createMockHistoryItem();

		it('should return 400 when email or data is missing', async () => {
			mockRequest = createMockRequest({ body: {} });

			await controller.removeHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email and data are required',
				status: 400,
			});
		});

		it('should remove history successfully', async () => {
			mockRequest = createMockRequest({
				body: {
					email: 'test@example.com',
					data: mockHistoryItem,
				},
			});
			mockHistoryService.removeHistory.mockResolvedValue(undefined);

			await controller.removeHistory(mockRequest as Request, mockResponse as Response);

			expect(mockHistoryService.removeHistory).toHaveBeenCalledWith(
				'test@example.com',
				mockHistoryItem
			);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'History removed successfully',
				status: 201,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({
				body: {
					email: 'test@example.com',
					data: mockHistoryItem,
				},
			});
			mockHistoryService.removeHistory.mockRejectedValue(new Error('Test error'));

			await controller.removeHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Error removing history',
				status: 500,
				error: expect.any(Error),
			});
		});
	});

	describe('getHistory', () => {
		it('should return 400 when email is missing', async () => {
			mockRequest = createMockRequest({ query: {} });

			await controller.getHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Email is required',
				status: 400,
			});
		});

		it('should return history collection successfully', async () => {
			const mockData: HistoryCollection = {
				manhwa: [createMockHistoryItem()],
				id: 'test-id',
			};
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockHistoryService.getHistory.mockResolvedValue(mockData);

			await controller.getHistory(mockRequest as Request, mockResponse as Response);

			expect(mockHistoryService.getHistory).toHaveBeenCalledWith('test@example.com');
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'History listed successfully',
				status: 200,
				data: mockData,
			});
		});

		it('should handle errors', async () => {
			mockRequest = createMockRequest({ query: { email: 'test@example.com' } });
			mockHistoryService.getHistory.mockRejectedValue(new Error('Test error'));

			await controller.getHistory(mockRequest as Request, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Error listing history',
				status: 500,
				error: expect.any(Error),
			});
		});
	});
});

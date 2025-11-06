import { HistoryService } from '../history.service';
import { HistoryRepository } from '../../repository/history.repository';
import { HistoryItem } from '../../types/manhwa.types';

jest.mock('../../repository/history.repository');

describe('HistoryService', () => {
	let service: HistoryService;
	let mockHistoryRepository: jest.Mocked<HistoryRepository>;

	const mockHistoryItem: HistoryItem = {
		title: 'https://example.com/manhwa',
		date: '01/01/2024',
	};

	beforeEach(() => {
		mockHistoryRepository = {
			getHistory: jest.fn(),
			createHistory: jest.fn(),
			addHistoryItem: jest.fn(),
			removeHistoryItem: jest.fn(),
		} as unknown as jest.Mocked<HistoryRepository>;

		(HistoryRepository as jest.Mock).mockImplementation(() => mockHistoryRepository);

		service = new HistoryService();
	});

	describe('addHistory', () => {
		it('should add history item with current date', async () => {
			mockHistoryRepository.addHistoryItem.mockResolvedValue(undefined);

			const dateSpy = jest.spyOn(Date.prototype, 'toLocaleDateString');
			dateSpy.mockReturnValue('01/01/2024');

			await service.addHistory('test@example.com', 'https://example.com/manhwa');

			expect(mockHistoryRepository.addHistoryItem).toHaveBeenCalledWith('test@example.com', {
				title: 'https://example.com/manhwa',
				date: '01/01/2024',
			});

			dateSpy.mockRestore();
		});
	});

	describe('removeHistory', () => {
		it('should remove history item', async () => {
			mockHistoryRepository.removeHistoryItem.mockResolvedValue(undefined);

			await service.removeHistory('test@example.com', mockHistoryItem);

			expect(mockHistoryRepository.removeHistoryItem).toHaveBeenCalledWith(
				'test@example.com',
				mockHistoryItem
			);
		});
	});

	describe('getHistory', () => {
		it('should return history collection when data exists', async () => {
			const mockData = { manhwa: [mockHistoryItem], id: 'test-id' };
			mockHistoryRepository.getHistory.mockResolvedValue(mockData);

			const result = await service.getHistory('test@example.com');

			expect(result).toEqual(mockData);
			expect(mockHistoryRepository.getHistory).toHaveBeenCalledWith('test@example.com');
		});

		it('should return empty collection when data does not exist', async () => {
			mockHistoryRepository.getHistory.mockResolvedValue(null);

			const result = await service.getHistory('test@example.com');

			expect(result).toEqual({ manhwa: [] });
			expect(mockHistoryRepository.getHistory).toHaveBeenCalledWith('test@example.com');
		});
	});
});

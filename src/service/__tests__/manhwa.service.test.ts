import { ManhwaService } from '../manhwa.service';
import { ManhwaRepository } from '../../repository/manhwa.repository';
import { HistoryRepository } from '../../repository/history.repository';
import { Manhwa } from '../../types/manhwa.types';

jest.mock('../../repository/manhwa.repository');
jest.mock('../../repository/history.repository');

describe('ManhwaService', () => {
	let service: ManhwaService;
	let mockManhwaRepository: jest.Mocked<ManhwaRepository>;
	let mockHistoryRepository: jest.Mocked<HistoryRepository>;

	const mockManhwa: Manhwa = {
		title: 'https://example.com/manhwa',
		date: '01/01/2024',
		chapter: '1',
		name: 'Test Manhwa',
		img: 'https://example.com/image.jpg',
		card: false,
	};

	beforeEach(() => {
		mockManhwaRepository = {
			getManhwa: jest.fn(),
			createManhwa: jest.fn(),
			updateManhwa: jest.fn(),
			removeManhwaItem: jest.fn(),
			checkUserExists: jest.fn(),
		} as unknown as jest.Mocked<ManhwaRepository>;

		mockHistoryRepository = {
			createHistory: jest.fn(),
			addHistoryItem: jest.fn(),
			removeHistoryItem: jest.fn(),
			getHistory: jest.fn(),
		} as unknown as jest.Mocked<HistoryRepository>;

		(ManhwaRepository as jest.Mock).mockImplementation(() => mockManhwaRepository);
		(HistoryRepository as jest.Mock).mockImplementation(() => mockHistoryRepository);

		service = new ManhwaService();
	});

	describe('checkAndCreateUser', () => {
		it('should create user when user does not exist', async () => {
			mockManhwaRepository.checkUserExists.mockResolvedValue(false);
			mockManhwaRepository.createManhwa.mockResolvedValue(undefined);
			mockHistoryRepository.createHistory.mockResolvedValue(undefined);

			const result = await service.checkAndCreateUser('test@example.com');

			expect(result).toBe(false);
			expect(mockManhwaRepository.checkUserExists).toHaveBeenCalledWith('test@example.com');
			expect(mockManhwaRepository.createManhwa).toHaveBeenCalled();
			expect(mockHistoryRepository.createHistory).toHaveBeenCalledWith('test@example.com', []);
		});

		it('should return true when user already exists', async () => {
			mockManhwaRepository.checkUserExists.mockResolvedValue(true);

			const result = await service.checkAndCreateUser('test@example.com');

			expect(result).toBe(true);
			expect(mockManhwaRepository.checkUserExists).toHaveBeenCalledWith('test@example.com');
			expect(mockManhwaRepository.createManhwa).not.toHaveBeenCalled();
		});
	});

	describe('addManhwa', () => {
		it('should add new manhwa when no match exists', async () => {
			mockManhwaRepository.getManhwa.mockResolvedValue({ manhwa: [] });
			mockManhwaRepository.updateManhwa.mockResolvedValue(undefined);

			await service.addManhwa(
				'https://example.com/manhwa',
				'1',
				'Test Manhwa',
				'test@example.com',
				'https://example.com/image.jpg',
				false
			);

			expect(mockManhwaRepository.getManhwa).toHaveBeenCalledWith('test@example.com');
			expect(mockManhwaRepository.updateManhwa).toHaveBeenCalled();
		});

		it('should update existing manhwa when match exists', async () => {
			mockManhwaRepository.getManhwa.mockResolvedValue({
				manhwa: [
					{
						title: 'https://example.com/manhwa',
						date: '01/01/2024',
						chapter: '1',
						name: 'Test Manhwa',
						img: 'https://example.com/image.jpg',
						card: false,
					},
				],
			});
			mockManhwaRepository.updateManhwa.mockResolvedValue(undefined);

			await service.addManhwa(
				'https://example.com/manhwa',
				'2',
				'Test Manhwa',
				'test@example.com',
				'https://example.com/image.jpg',
				false
			);

			expect(mockManhwaRepository.getManhwa).toHaveBeenCalledWith('test@example.com');
			expect(mockManhwaRepository.updateManhwa).toHaveBeenCalled();
		});

		it('should add new manhwa when match does not exist', async () => {
			mockManhwaRepository.getManhwa.mockResolvedValue({
				manhwa: [
					{
						title: 'https://example.com/manhwa2',
						date: '01/01/2024',
						chapter: '1',
						name: 'Different Manhwa',
						img: 'https://example.com/image2.jpg',
						card: false,
					},
				],
			});
			mockManhwaRepository.updateManhwa.mockResolvedValue(undefined);

			await service.addManhwa(
				'https://example.com/manhwa',
				'1',
				'Test Manhwa',
				'test@example.com',
				'https://example.com/image.jpg',
				false
			);

			expect(mockManhwaRepository.updateManhwa).toHaveBeenCalled();
			const updateCall = mockManhwaRepository.updateManhwa.mock.calls[0];
			expect(updateCall[1]).toHaveLength(2);
		});
	});

	describe('removeManhwa', () => {
		it('should remove manhwa item', async () => {
			mockManhwaRepository.removeManhwaItem.mockResolvedValue(undefined);

			await service.removeManhwa('test@example.com', mockManhwa);

			expect(mockManhwaRepository.removeManhwaItem).toHaveBeenCalledWith(
				'test@example.com',
				mockManhwa
			);
		});
	});

	describe('getManhwa', () => {
		it('should return manhwa collection when data exists', async () => {
			const mockData = { manhwa: [mockManhwa], id: 'test-id' };
			mockManhwaRepository.getManhwa.mockResolvedValue(mockData);

			const result = await service.getManhwa('test@example.com');

			expect(result).toEqual(mockData);
			expect(mockManhwaRepository.getManhwa).toHaveBeenCalledWith('test@example.com');
		});

		it('should return empty collection when data does not exist', async () => {
			mockManhwaRepository.getManhwa.mockResolvedValue(null);

			const result = await service.getManhwa('test@example.com');

			expect(result).toEqual({ manhwa: [] });
			expect(mockManhwaRepository.getManhwa).toHaveBeenCalledWith('test@example.com');
		});
	});
});

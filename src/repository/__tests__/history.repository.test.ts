import { HistoryRepository } from '../history.repository';
import { HistoryItem, HistoryCollection } from '../../types/manhwa.types';

// Mock do database
jest.mock('../../config/database', () => {
	const mockDoc = {
		exists: true,
		id: 'test-doc-id',
		data: jest.fn(),
		get: jest.fn(),
		set: jest.fn(),
		update: jest.fn(),
	};

	const mockCollection = {
		doc: jest.fn(() => mockDoc),
	};

	return {
		historyRef: mockCollection,
		admin: {
			firestore: {
				FieldValue: {
					arrayUnion: jest.fn((item: HistoryItem) => item),
					arrayRemove: jest.fn((item: HistoryItem) => item),
				},
			},
		},
	};
});

describe('HistoryRepository', () => {
	let repository: HistoryRepository;
	const mockHistoryItem: HistoryItem = {
		title: 'https://example.com/manhwa',
		date: '01/01/2024',
	};

	beforeEach(() => {
		repository = new HistoryRepository();
		jest.clearAllMocks();
	});

	describe('getHistory', () => {
		it('should return history collection when document exists', async () => {
			const { historyRef } = await import('../../config/database');
			const mockDoc = historyRef.doc('test-key');

			(mockDoc.get as jest.Mock).mockResolvedValue({
				exists: true,
				id: 'test-doc-id',
				data: (): HistoryCollection => ({
					manhwa: [mockHistoryItem],
				}),
			});

			const result = await repository.getHistory('test@example.com');

			expect(result).not.toBeNull();
			expect(result?.manhwa).toHaveLength(1);
			expect(result?.id).toBe('test-doc-id');
		});

		it('should return null when document does not exist', async () => {
			const { historyRef } = await import('../../config/database');
			const mockDoc = historyRef.doc('test-key');

			(mockDoc.get as jest.Mock).mockResolvedValue({
				exists: false,
			});

			const result = await repository.getHistory('test@example.com');

			expect(result).toBeNull();
		});
	});

	describe('createHistory', () => {
		it('should create history collection', async () => {
			const { historyRef } = await import('../../config/database');
			const mockDoc = historyRef.doc('test-key');

			(mockDoc.set as jest.Mock).mockResolvedValue(undefined);

			await repository.createHistory('test@example.com', [mockHistoryItem]);

			expect(mockDoc.set).toHaveBeenCalledWith({
				manhwa: [mockHistoryItem],
			});
		});
	});

	describe('addHistoryItem', () => {
		it('should add history item to collection', async () => {
			const { historyRef, admin } = await import('../../config/database');
			const mockDoc = historyRef.doc('test-key');

			(mockDoc.update as jest.Mock).mockResolvedValue(undefined);

			await repository.addHistoryItem('test@example.com', mockHistoryItem);

			expect(mockDoc.update).toHaveBeenCalled();
			expect(admin.firestore.FieldValue.arrayUnion).toHaveBeenCalledWith(mockHistoryItem);
		});
	});

	describe('removeHistoryItem', () => {
		it('should remove history item from collection', async () => {
			const { historyRef, admin } = await import('../../config/database');
			const mockDoc = historyRef.doc('test-key');

			(mockDoc.update as jest.Mock).mockResolvedValue(undefined);

			await repository.removeHistoryItem('test@example.com', mockHistoryItem);

			expect(mockDoc.update).toHaveBeenCalled();
			expect(admin.firestore.FieldValue.arrayRemove).toHaveBeenCalledWith(mockHistoryItem);
		});
	});
});

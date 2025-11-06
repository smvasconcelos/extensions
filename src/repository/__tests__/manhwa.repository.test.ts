import { ManhwaRepository } from '../manhwa.repository';
import { Manhwa, ManhwaCollection } from '../../types/manhwa.types';

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
		manhwaRef: mockCollection,
		admin: {
			firestore: {
				FieldValue: {
					arrayRemove: jest.fn((item: Manhwa) => item),
				},
			},
		},
	};
});

describe('ManhwaRepository', () => {
	let repository: ManhwaRepository;
	const mockManhwa: Manhwa = {
		title: 'https://example.com/manhwa',
		date: '01/01/2024',
		chapter: '1',
		name: 'Test Manhwa',
		img: 'https://example.com/image.jpg',
		card: false,
	};

	beforeEach(() => {
		repository = new ManhwaRepository();
		jest.clearAllMocks();
	});

	describe('getManhwa', () => {
		it('should return manhwa collection when document exists', async () => {
			const { manhwaRef } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.get as jest.Mock).mockResolvedValue({
				exists: true,
				id: 'test-doc-id',
				data: (): ManhwaCollection => ({
					manhwa: [mockManhwa],
				}),
			});

			const result = await repository.getManhwa('test@example.com');

			expect(result).not.toBeNull();
			expect(result?.manhwa).toHaveLength(1);
			expect(result?.id).toBe('test-doc-id');
		});

		it('should return null when document does not exist', async () => {
			const { manhwaRef } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.get as jest.Mock).mockResolvedValue({
				exists: false,
			});

			const result = await repository.getManhwa('test@example.com');

			expect(result).toBeNull();
		});
	});

	describe('createManhwa', () => {
		it('should create manhwa collection', async () => {
			const { manhwaRef } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.set as jest.Mock).mockResolvedValue(undefined);

			await repository.createManhwa('test@example.com', [mockManhwa]);

			expect(mockDoc.set).toHaveBeenCalledWith({
				manhwa: [mockManhwa],
			});
		});
	});

	describe('updateManhwa', () => {
		it('should update manhwa collection', async () => {
			const { manhwaRef } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.update as jest.Mock).mockResolvedValue(undefined);

			await repository.updateManhwa('test@example.com', [mockManhwa]);

			expect(mockDoc.update).toHaveBeenCalledWith({
				manhwa: [mockManhwa],
			});
		});
	});

	describe('removeManhwaItem', () => {
		it('should remove manhwa item from collection', async () => {
			const { manhwaRef, admin } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.update as jest.Mock).mockResolvedValue(undefined);

			await repository.removeManhwaItem('test@example.com', mockManhwa);

			expect(mockDoc.update).toHaveBeenCalled();
			expect(admin.firestore.FieldValue.arrayRemove).toHaveBeenCalledWith(mockManhwa);
		});
	});

	describe('checkUserExists', () => {
		it('should return true when user exists', async () => {
			const { manhwaRef } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.get as jest.Mock).mockResolvedValue({
				exists: true,
			});

			const result = await repository.checkUserExists('test@example.com');

			expect(result).toBe(true);
		});

		it('should return false when user does not exist', async () => {
			const { manhwaRef } = await import('../../config/database');
			const mockDoc = manhwaRef.doc('test-key');

			(mockDoc.get as jest.Mock).mockResolvedValue({
				exists: false,
			});

			const result = await repository.checkUserExists('test@example.com');

			expect(result).toBe(false);
		});
	});
});

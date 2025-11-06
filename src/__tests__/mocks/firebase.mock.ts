import { Manhwa, ManhwaCollection, HistoryItem, HistoryCollection } from '../../types/manhwa.types';

export const mockFirestoreDoc = {
	exists: true,
	id: 'test-doc-id',
	data: (): ManhwaCollection => ({
		manhwa: [
			{
				title: 'https://example.com/manhwa1',
				date: '01/01/2024',
				chapter: '1',
				name: 'Test Manhwa',
				img: 'https://example.com/image.jpg',
        card: false,
        userId: 'dGVzdEBleGFtcGxlLmNvbQ==',
        id: 'test-doc-id'
			},
		],
	}),
	get: jest.fn(),
	set: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
};

export const mockFirestoreCollection = {
	doc: jest.fn(() => mockFirestoreDoc),
	get: jest.fn(),
	add: jest.fn(),
};

export const mockFirestore = {
	collection: jest.fn(() => mockFirestoreCollection),
	batch: jest.fn(),
};

export const mockAdmin = {
	firestore: jest.fn(() => mockFirestore),
	credential: {
		cert: jest.fn(),
	},
	initializeApp: jest.fn(),
};

export const mockFieldValue = {
	arrayUnion: jest.fn((item: Manhwa | HistoryItem) => item),
	arrayRemove: jest.fn((item: Manhwa | HistoryItem) => item),
};

// Mock do firestore.FieldValue
(mockAdmin.firestore as unknown as { FieldValue: typeof mockFieldValue }).FieldValue = mockFieldValue;

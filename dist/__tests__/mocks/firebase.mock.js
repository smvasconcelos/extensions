"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockFieldValue = exports.mockAdmin = exports.mockFirestore = exports.mockFirestoreCollection = exports.mockFirestoreDoc = void 0;
exports.mockFirestoreDoc = {
    exists: true,
    id: 'test-doc-id',
    data: () => ({
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
exports.mockFirestoreCollection = {
    doc: jest.fn(() => exports.mockFirestoreDoc),
    get: jest.fn(),
    add: jest.fn(),
};
exports.mockFirestore = {
    collection: jest.fn(() => exports.mockFirestoreCollection),
    batch: jest.fn(),
};
exports.mockAdmin = {
    firestore: jest.fn(() => exports.mockFirestore),
    credential: {
        cert: jest.fn(),
    },
    initializeApp: jest.fn(),
};
exports.mockFieldValue = {
    arrayUnion: jest.fn((item) => item),
    arrayRemove: jest.fn((item) => item),
};
// Mock do firestore.FieldValue
exports.mockAdmin.firestore.FieldValue = exports.mockFieldValue;

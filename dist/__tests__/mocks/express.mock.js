"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockHistoryItem = exports.createMockManhwa = exports.createMockResponse = exports.createMockRequest = void 0;
const createMockRequest = (overrides) => {
    return {
        query: {},
        body: {},
        params: {},
        ...overrides,
    };
};
exports.createMockRequest = createMockRequest;
const createMockResponse = () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };
    return res;
};
exports.createMockResponse = createMockResponse;
const createMockManhwa = (overrides) => {
    return {
        userId: 'dGVzdEBleGFtcGxlLmNvbQ==',
        title: 'https://example.com/manhwa',
        date: '01/01/2024',
        chapter: '1',
        name: 'Test Manhwa',
        img: 'https://example.com/image.jpg',
        card: false,
        ...overrides,
    };
};
exports.createMockManhwa = createMockManhwa;
const createMockHistoryItem = (overrides) => {
    return {
        title: 'https://example.com/manhwa',
        date: '01/01/2024',
        ...overrides,
    };
};
exports.createMockHistoryItem = createMockHistoryItem;

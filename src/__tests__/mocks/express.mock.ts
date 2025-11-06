import { Request, Response } from 'express';
import { Manhwa, HistoryItem } from '../../types/manhwa.types';

export const createMockRequest = (overrides?: Partial<Request>): Partial<Request> => {
	return {
		query: {},
		body: {},
		params: {},
		...overrides,
	};
};

export const createMockResponse = (): Partial<Response> => {
	const res: Partial<Response> = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
		send: jest.fn().mockReturnThis(),
	};
	return res;
};

export const createMockManhwa = (overrides?: Partial<Manhwa>): Manhwa => {
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

export const createMockHistoryItem = (overrides?: Partial<HistoryItem>): HistoryItem => {
	return {
		title: 'https://example.com/manhwa',
		date: '01/01/2024',
		...overrides,
	};
};

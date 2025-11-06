import { Request, Response } from 'express';
import { Manhwa, HistoryItem } from './manhwa.types';

export interface ApiResponse<T> {
	message: string;
	status: number;
	data?: T;
	error?: unknown;
}

export interface RequestQuery {
	email?: string;
	url?: string;
}

export interface AddManhwaRequestBody {
	url?: string;
	chapter?: string;
	name?: string;
	email?: string;
	img?: string;
	card?: boolean;
}

export interface RemoveManhwaRequestBody {
	data: Manhwa;
	email: string;
}

export interface RemoveHistoryRequestBody {
	data: HistoryItem;
	email: string;
}

export interface TypedRequest<T = Record<string, never>>
  extends Request<{}, any, T, RequestQuery> {}

export interface TypedResponse<T> extends Response {
  send: (body: ApiResponse<T>) => this;
}

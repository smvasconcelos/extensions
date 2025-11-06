export interface Manhwa {
	id?: string;           // ID do documento no Firestore
	userId: string;        // Email codificado (base64) - OBRIGATÓRIO
	title: string;
	date: string;
	chapter: string;
	name: string;
	img: string;
	card: boolean;
}

export interface HistoryItem {
	title: string;
	date: string;
}

export interface ManhwaCollection {
	manhwa: Manhwa[];
	id?: string;
}

export interface HistoryCollection {
	manhwa: HistoryItem[];
	id?: string;
}

export interface MatchResult<T> {
	data: T;
	match: boolean;
}

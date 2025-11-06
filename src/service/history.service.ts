import { HistoryRepository } from '../repository/history.repository';
import { HistoryItem, HistoryCollection } from '../types/manhwa.types';

export class HistoryService {
	private repository: HistoryRepository;

	constructor() {
		this.repository = new HistoryRepository();
	}

	// Adicionar item ao histórico
	async addHistory(email: string, title: string): Promise<void> {
		const historyItem: HistoryItem = {
			title: title,
			date: new Date().toLocaleDateString('pt-BR').toString(),
		};

		await this.repository.addHistoryItem(email, historyItem);
	}

	// Remover item do histórico
	async removeHistory(email: string, historyItem: HistoryItem): Promise<void> {
		await this.repository.removeHistoryItem(email, historyItem);
	}

	// Buscar todo histórico de um usuário
	async getHistory(email: string): Promise<HistoryCollection> {
		const items = await this.repository.getHistoryByUser(email);
		return {
			manhwa: items,
		};
	}
}

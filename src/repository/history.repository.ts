import { historyRef, admin } from '../config/database';
import { HistoryItem, HistoryCollection } from '../types/manhwa.types';

export class HistoryRepository {
	private static encodeKey(email: string): string {
		return Buffer.from(email).toString('base64');
	}

	// Buscar todo histórico de um usuário
	async getHistoryByUser(email: string): Promise<HistoryItem[]> {
		const key = HistoryRepository.encodeKey(email);
		const doc = await historyRef.doc(key).get();

		if (!doc.exists) {
			return [];
		}

		const data = doc.data() as HistoryCollection;
		const histories = data.manhwa || [];

		// Ordenar por data (mais recente primeiro)
		return histories.sort((a, b) => {
			const dateA = new Date(a.date.split('/').reverse().join('-'));
			const dateB = new Date(b.date.split('/').reverse().join('-'));
			return dateB.getTime() - dateA.getTime();
		});
	}

	// Adicionar item ao histórico (usando arrayUnion)
	async addHistoryItem(email: string, item: HistoryItem): Promise<void> {
		const key = HistoryRepository.encodeKey(email);
		const docRef = historyRef.doc(key);

		// Usar update com arrayUnion (cria o documento se não existir quando usado com merge)
		await docRef.update({
			manhwa: admin.firestore.FieldValue.arrayUnion(item),
		}).catch(async (error) => {
			// Se o documento não existir, criar com o primeiro item
			if (error.code === 'not-found' || error.code === 5) {
				await docRef.set({
					manhwa: [item],
				});
			} else {
				throw error;
			}
		});
	}

	// Remover item do histórico (usando arrayRemove)
	async removeHistoryItem(email: string, item: HistoryItem): Promise<void> {
		const key = HistoryRepository.encodeKey(email);
		const docRef = historyRef.doc(key);

		await docRef.update({
			manhwa: admin.firestore.FieldValue.arrayRemove(item),
		});
	}

	// Verificar se usuário tem histórico
	async checkUserHistoryExists(email: string): Promise<boolean> {
		const key = HistoryRepository.encodeKey(email);
		const doc = await historyRef.doc(key).get();

		if (!doc.exists) {
			return false;
		}

		const data = doc.data() as HistoryCollection;
		return (data.manhwa?.length || 0) > 0;
	}
}

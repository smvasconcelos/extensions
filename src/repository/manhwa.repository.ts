import { manhwaRef } from '../config/database';
import { Manhwa } from '../types/manhwa.types';

export class ManhwaRepository {
	private static encodeKey(email: string): string {
		return Buffer.from(email).toString('base64');
	}

	// Buscar todos os manhwas de um usuário
	async getManhwaByUser(email: string): Promise<Manhwa[]> {
		const key = ManhwaRepository.encodeKey(email);
		const snapshot = await manhwaRef.where('userId', '==', key).get();

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Manhwa, 'id'>),
		}));
	}

	// Buscar manhwa específico por ID
	async getManhwaById(id: string): Promise<Manhwa | null> {
		const doc = await manhwaRef.doc(id).get();
		if (!doc.exists) return null;

		return {
			id: doc.id,
			...(doc.data() as Omit<Manhwa, 'id'>),
		};
	}

	// Verificar se manhwa já existe (para evitar duplicatas)
	async checkManhwaExists(
		userId: string,
		name: string,
		card: boolean
	): Promise<Manhwa | null> {
		const snapshot = await manhwaRef
			.where('userId', '==', userId)
			.where('name', '==', name)
			.where('card', '==', card)
			.limit(1)
			.get();

		if (snapshot.empty) return null;

		const doc = snapshot.docs[0];
		return {
			id: doc.id,
			...(doc.data() as Omit<Manhwa, 'id'>),
		};
	}

	// Criar novo manhwa
	async createManhwa(manhwa: Manhwa): Promise<string> {
		const { generateManhwaId } = await import('../utils/id-generator');
		const id = generateManhwaId(manhwa.userId, manhwa.name, manhwa.card);

		await manhwaRef.doc(id).set(manhwa);
		return id;
	}

	// Atualizar manhwa existente
	async updateManhwa(id: string, updates: Partial<Manhwa>): Promise<void> {
		await manhwaRef.doc(id).update(updates);
	}

	// Deletar manhwa
	async deleteManhwa(id: string): Promise<void> {
		await manhwaRef.doc(id).delete();
	}

	// Verificar se usuário existe (tem algum manhwa)
	async checkUserExists(email: string): Promise<boolean> {
		const key = ManhwaRepository.encodeKey(email);
		const snapshot = await manhwaRef.where('userId', '==', key).limit(1).get();

		return !snapshot.empty;
	}
}

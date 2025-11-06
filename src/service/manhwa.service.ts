import { ManhwaRepository } from '../repository/manhwa.repository';
import { Manhwa, ManhwaCollection } from '../types/manhwa.types';

export class ManhwaService {
	private repository: ManhwaRepository;

	constructor() {
		this.repository = new ManhwaRepository();
	}

	private static encodeKey(email: string): string {
		return Buffer.from(email).toString('base64');
	}

	// Verificar se usuário existe (não cria documento vazio)
	async checkAndCreateUser(email: string): Promise<boolean> {
		return await this.repository.checkUserExists(email);
	}

	// Adicionar ou atualizar manhwa
	async addManhwa(
		title: string,
		chapter: string,
		name: string,
		email: string,
		img: string,
		card: boolean
	): Promise<void> {
		const key = ManhwaService.encodeKey(email);
		const data: Manhwa = {
			userId: key,
			title: title,
			date: new Date().toLocaleDateString('pt-BR').toString(),
			chapter: chapter || '',
			name: name || '',
			img: img || '',
			card: card || false,
		};

		// Verificar se já existe
		const existing = await this.repository.checkManhwaExists(key, data.name, data.card);

		if (existing && existing.id) {
			// Atualizar existente
			return await this.repository.updateManhwa(existing.id, data);
		}

    // Criar novo
    await this.repository.createManhwa(data);
	}

	// Remover manhwa
	async removeManhwa(email: string, manhwaItem: Manhwa): Promise<void> {
    // Se tem ID, deleta diretamente
		if (manhwaItem.id) {
     return await this.repository.deleteManhwa(manhwaItem.id);
		}

    // Fallback: busca e deleta
    const key = ManhwaService.encodeKey(email);
    const existing = await this.repository.checkManhwaExists(
      key,
      manhwaItem.name,
      manhwaItem.card
    );

    if (existing?.id) {
      await this.repository.deleteManhwa(existing.id);
    }
	}

	// Buscar todos os manhwas de um usuário
	async getManhwa(email: string): Promise<ManhwaCollection> {
		const manhwas = await this.repository.getManhwaByUser(email);

		return {
			manhwa: manhwas,
		};
	}
}

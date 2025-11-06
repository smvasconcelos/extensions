"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManhwaService = void 0;
const manhwa_repository_1 = require("../repository/manhwa.repository");
class ManhwaService {
    constructor() {
        this.repository = new manhwa_repository_1.ManhwaRepository();
    }
    static encodeKey(email) {
        return Buffer.from(email).toString('base64');
    }
    // Verificar se usuário existe (não cria documento vazio)
    async checkAndCreateUser(email) {
        return await this.repository.checkUserExists(email);
    }
    // Adicionar ou atualizar manhwa
    async addManhwa(title, chapter, name, email, img, card) {
        const key = ManhwaService.encodeKey(email);
        const data = {
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
    async removeManhwa(email, manhwaItem) {
        // Se tem ID, deleta diretamente
        if (manhwaItem.id) {
            return await this.repository.deleteManhwa(manhwaItem.id);
        }
        // Fallback: busca e deleta
        const key = ManhwaService.encodeKey(email);
        const existing = await this.repository.checkManhwaExists(key, manhwaItem.name, manhwaItem.card);
        if (existing?.id) {
            await this.repository.deleteManhwa(existing.id);
        }
    }
    // Buscar todos os manhwas de um usuário
    async getManhwa(email) {
        const manhwas = await this.repository.getManhwaByUser(email);
        return {
            manhwa: manhwas,
        };
    }
}
exports.ManhwaService = ManhwaService;

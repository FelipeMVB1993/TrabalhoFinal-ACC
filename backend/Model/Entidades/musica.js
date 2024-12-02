class Musica {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const musicas = await this.db.ExecutaComando('SELECT * FROM musica');
            return musicas;
        } catch (error) {
            console.error("Erro ao buscar músicas", error);
            throw error;
        }
    }

    async filtrar({ nome_musica }) {
        try {
            let sql = "SELECT * FROM musica WHERE nome_musica LIKE ?";
            const params = [`%${nome_musica}%`];
            const musicas = await this.db.ExecutaComando(sql, params);
            return musicas;
        } catch (error) {
            console.error("Erro durante a filtragem", error);
            throw error;
        }
    }

    async getByCodigo(id) {
        try {
            const musica = await this.db.ExecutaComando('SELECT * FROM musica WHERE id = ?', [id]);
            return musica[0];
        } catch (error) {
            console.error("Erro ao buscar música", error);
            throw error;
        }
    }

    async create(dadosMusica) {
        try {
            await this.db.ExecutaComandoNonQuery('INSERT INTO musica SET ?', dadosMusica);
        } catch (error) {
            console.error("Erro ao cadastrar música", error);
            throw error;
        }
    }

    async update(id, nome_musica) {
        try {
            // Corrigido o SQL para incluir "=" no comando UPDATE
            await this.db.ExecutaComandoNonQuery('UPDATE musica SET nome_musica = ? WHERE id = ?', [nome_musica, id]);
        } catch (error) {
            console.error("Erro ao atualizar música", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.db.ExecutaComandoNonQuery('DELETE FROM musica WHERE id = ?', [id]);
        } catch (error) {
            console.error("Erro ao deletar música", error);
            throw error;
        }
    }
}

module.exports = Musica;

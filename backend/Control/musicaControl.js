const Musica = require("../Model/Entidades/musica.js");
const Database = require("../Model/database.js");

class MusicaControl {

    constructor() {
        this.db = new Database();
        this.musica = new Musica(this.db);
    }

    async getAll(req, res) {
        res.type('application/json');
        let termo = req.params.termo || "";
        if (req.method === "GET") {
            try {
                const listaMusicas = await this.musica.getAll(termo);
                res.json({ status: true, listaMusicas });
            } catch (erro) {
                res.json({ status: false, mensagem: "Não foi possível obter as musicas: " + erro.message });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método GET para consultar musicas!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await this.musica.filtrar(filtro);
            res.status(200).json(result);
        } catch (error) {
            console.error("Erro durante a filtragem", error);
            res.status(500).json({ error: "Erro durante a filtragem" });
        }
    }

    async getByCodigo(req, res) {
        const id = req.params.id;
        try {
            const result = await this.musica.getByCodigo(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'Música não encontrada' });
            }
        } catch (error) {
            console.error("Erro ao buscar música", error);
            res.status(500).json({ error: "Erro ao buscar música" });
        }
    }

    async create(req, res) {
        const musicaData = req.body;
        try {
            await this.musica.create(musicaData);
            res.status(200).json({ message: "Música cadastrada com sucesso" });
        } catch (error) {
            console.error("Erro ao cadastrar música", error);
            res.status(500).json({ error: "Erro ao cadastrar música" });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const { nome_musica } = req.body;

        // Validação para garantir que o nome da música seja fornecido
        if (!nome_musica) {
            return res.status(400).json({ error: "Nome da música é obrigatório no corpo da requisição" });
        }

        try {
            await this.musica.update(id, nome_musica);
            res.status(200).json({ message: "Música atualizada com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar música", error);
            res.status(500).json({ error: "Erro ao atualizar música" });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.musica.delete(id);
            res.status(200).json({ message: 'Música deletada com sucesso' });
        } catch (error) {
            console.error("Erro ao deletar música", error);
            res.status(500).json({ error: "Erro ao deletar música" });
        }
    }
}

module.exports = MusicaControl;

const API_BASE_URL = 'http://localhost:3001';

class MusicaService {

    async createMusica(musicaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(musicaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao cadastrar Disciplina')
            }
        } catch (error) {
            throw error;
        }
    }


}

export default MusicaService
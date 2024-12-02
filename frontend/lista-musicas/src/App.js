import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, Container, Alert } from 'react-bootstrap';

const MusicManager = () => {
  const [musics, setMusics] = useState([]);
  const [musicInput, setMusicInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const apiEndpoint = 'http://localhost:3001/musica';

  // Função para carregar músicas da API
  const fetchMusics = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      if (data.status) {
        setMusics(data.listaMusicas);
      }
    } catch (error) {
      console.error('Erro ao carregar músicas:', error);
      setFeedbackMessage('Erro ao carregar as músicas.');
      setFeedbackType('danger');
      setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
    }
  };

  // Carregar músicas ao montar o componente
  useEffect(() => {
    fetchMusics();
  }, []);

  // Função para adicionar ou editar uma música
  const handleAddOrEditMusic = async () => {
    if (!musicInput.trim()) return;

    if (editingId) {
      // Edição de música
      try {
        const response = await fetch(`${apiEndpoint}/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome_musica: musicInput }),
        });

        if (response.ok) {
          fetchMusics(); // Recarregar a lista de músicas
          setEditingId(null);
          setMusicInput('');
          setFeedbackMessage('Música editada com sucesso!');
          setFeedbackType('success');
          setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
        } else {
          setFeedbackMessage('Erro ao editar a música.');
          setFeedbackType('danger');
          setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
        }
      } catch (error) {
        console.error('Erro ao editar música:', error);
        setFeedbackMessage('Erro ao editar a música.');
        setFeedbackType('danger');
        setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
      }
    } else {
      // Adicionar nova música
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome_musica: musicInput }),
        });

        if (response.ok) {
          fetchMusics(); // Recarregar a lista de músicas
          setMusicInput('');
          setFeedbackMessage('Música adicionada com sucesso!');
          setFeedbackType('success');
          setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
        } else {
          setFeedbackMessage('Erro ao adicionar a música.');
          setFeedbackType('danger');
          setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
        }
      } catch (error) {
        console.error('Erro ao adicionar música:', error);
        setFeedbackMessage('Erro ao adicionar a música.');
        setFeedbackType('danger');
        setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
      }
    }
  };

  // Função para excluir uma música
  const handleDeleteMusic = async (id) => {
    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMusics(); // Recarregar a lista de músicas
        setFeedbackMessage('Música excluída com sucesso!');
        setFeedbackType('success');
        setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
      } else {
        setFeedbackMessage('Erro ao excluir a música.');
        setFeedbackType('danger');
        setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
      }
    } catch (error) {
      console.error('Erro ao excluir música:', error);
      setFeedbackMessage('Erro ao excluir a música.');
      setFeedbackType('danger');
      setTimeout(() => setFeedbackMessage(''), 10000);  // Limpar mensagem após 10 segundos
    }
  };

  // Função para iniciar a edição de uma música
  const handleEditMusic = (id, name) => {
    setEditingId(id);
    setMusicInput(name); // Preenche o input principal com o nome da música
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Lista de Músicas</h1>

      {/* Mensagem de Feedback */}
      {feedbackMessage && (
        <Alert variant={feedbackType} onClose={() => setFeedbackMessage('')} dismissible>
          {feedbackMessage}
        </Alert>
      )}

      {/* Formulário para adicionar ou editar música */}
      <Form>
        <Form.Group controlId="musicInput">
          <Form.Control
            type="text"
            value={musicInput}
            onChange={(e) => setMusicInput(e.target.value)}
            placeholder="Digite o nome da música"
          />
        </Form.Group>
        <Button
          variant={editingId ? 'warning' : 'primary'}
          onClick={handleAddOrEditMusic}
          className="mt-3"
          block
        >
          {editingId ? 'Salvar Alteração' : 'Adicionar Música'}
        </Button>
      </Form>

      {/* Tabela de músicas */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Música</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {musics.map((music) => (
            <tr key={music.id}>
              <td>{music.id}</td>
              <td>{music.nome_musica}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditMusic(music.id, music.nome_musica)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteMusic(music.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MusicManager;

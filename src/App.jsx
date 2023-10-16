import { useState, useEffect } from 'react'
import axios from 'axios';
import CardPersonagem from './components/CardPersonagem';
import Perfil from './components/Perfil';
import './App.css'

function App() {
  const API = "https://rickandmortyapi.com/api/character/?status=alive"
  const [dados, setDados] = useState([]);
  const [personagem, setPersonagem] = useState({});
  const [mostrarDados, setMostrarDados] = useState(false);
  const [valorInput, setValorInput] = useState('');
  const [status, setStatus] = useState("Alive");


  useEffect(() => {
    axios.get(`${API}`)
      .then(response => {
        setDados(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  }, [])

  const mostrarPersonagem = (id) => {
    const ENDPOINT = `https://rickandmortyapi.com/api/character/${id}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setPersonagem(response.data);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
    setMostrarDados(true)
  }

  const mudarInput = (event) => {
    setValorInput(event.target.value);
  };

  const mudarNome = (nome) => {

    const ENDPOINT = `https://rickandmortyapi.com/api/character/?name=${nome}&status=${status }`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setDados(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  }

  const mudarStatus = (event) => {
    setStatus(event.target.value);
    const ENDPOINT = `https://rickandmortyapi.com/api/character/?status=${event.target.value}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setDados(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  };
  return (
    <div className='container'>
    
        <h1>
          Rick and Morty App
        </h1>
    
      <div className='corpo'>
        <div className='busca'>
          <h2>Lista de Personagens</h2>
          <div class="pesquisa">
            <input
              class="input-quadradinho"
              type="text"
              placeholder="Pesquisar"
              value={valorInput}
              onChange={mudarInput}
            />
            <button class="botao-pesquisar" onClick={() => mudarNome(valorInput)}>Pesquisar</button>

            <select value={status} onChange={mudarStatus}>
              <option value="Alive">Vivo</option>
              <option value="Dead">Morto</option>
              <option value="unknown">Desconhecido</option>
            </select>
          </div>

          {dados.map((e, i) => (
            <div className='card-personagem' onClick={() => mostrarPersonagem(e.id)} style={{ cursor: 'pointer' }}>
              <CardPersonagem img={e.image} nome={e.name} key={i} />
            </div>
          ))
          }
        </div>
        {mostrarDados ? (
          <Perfil nome={personagem.name} img={personagem.image} status={personagem.status} especie={personagem.species} eps={personagem.episode} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default App

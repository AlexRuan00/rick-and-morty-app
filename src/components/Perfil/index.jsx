import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardEpisodeos from '../CardEpisodeos';
import './Perfil.css';

const Perfil = ({ img, nome, status, especie, eps }) => {
    const [episodeos, setEpisodeos] = useState([]);

    useEffect(() => {
        if (eps) {
            const requests = eps.map(endpoint => axios.get(endpoint));

            Promise.all(requests)
                .then(responses => {
                    const episodeData = responses.map(response => response.data);
                    setEpisodeos(episodeData);
                })
                .catch(error => {
                    console.error('Error fetching API URLs:', error);
                });
        }
    }, [eps]);

    return (
        <div className='container-perfil'>
            <h3>Detalhes do personagem</h3>
            <div className='imagem-centro'>
                <img src={img} alt={nome} />
            </div>
            <div className='informacoes'>
                <p>Nome: {nome}</p>
                <p>Status: {status}</p>
                <p>Espécie: {especie}</p>
                <h3>Episódios:</h3>
                {episodeos.map((e, index) => (
                    <CardEpisodeos numero={e.episode} nome={e.name} key={index} />
                ))}
            </div>

        </div>
    );
};

export default Perfil;

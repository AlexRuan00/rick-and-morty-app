import './CardPersonagem.css';

const CardPersonagem = ({img, nome}) => {
    return(
        <div className='container-personagem'>
            <img className='imagem' src={img}/>
            <h3>{nome}</h3> 
        </div>
    )
}


export default CardPersonagem;
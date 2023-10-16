import './CardEpisodeos.css';

const CardEpisodeos = ({numero, nome}) => {
    return(
        <div className='container-episodeo'>
            <p>Número: {numero}</p> 
            <p>Título: {nome}</p> 
        </div>
    )
}


export default CardEpisodeos;
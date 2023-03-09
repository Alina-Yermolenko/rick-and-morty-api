import './Character.css'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const Character = ({ fetchData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  const characteristics = ['gender', 'status', 'species', 'origin', 'type'];

  useEffect(() => {
    const getCharacter = async () => {
      const data = await fetchData(`https://rickandmortyapi.com/api/character/${id}`)
      setCharacter(data)
    }
    getCharacter()
  }, [])

  return <div className="character">
    <div
      className="back"
      onClick={() => {
        navigate(-1)
      }}>
      <img src="img/arrow-back.svg" alt="arrow-back" className='arrow' />
      go back
    </div>
    {character && character.name && (
      <div className="character__info">
        <div
          className="character__image"
          style={{
            'backgroundImage': `url("${character.image}")`
          }}
        />
        <div className="character__text-block">
          <h2 className="character__name">
            {character.name}
          </h2>
          <div className="character__text-info">
            <div className="character__text-title">
              Information
            </div>
            <ul className="character__info-details">
              {
                characteristics.map((char) => {
                  return (
                    <li className='character-block' key={char}>
                      <h4>
                        {char.charAt(0).toUpperCase() + char.slice(1)}
                      </h4>
                      <p>
                        {
                          char !== 'origin' ? character[char] || 'Unknown' : character[char].name
                        }
                      </p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )}
  </div >
}

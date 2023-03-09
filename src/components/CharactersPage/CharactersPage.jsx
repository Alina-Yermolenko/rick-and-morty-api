import './CharactersPage.scss';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Pagination } from '../Pagination/Pagination';

export const CharactersPage = ({ fetchData, responseDiv }) => {
  const input = localStorage.getItem('inputValue') || '';
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [inputValue, setInputValue] = useState(input);
  const { search } = useLocation();
  const navigate = useNavigate();

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    throw new Error(error);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await fetchData(`https://rickandmortyapi.com/api/character${search}${inputValue && `&name=${inputValue}`}`)
      if (!data) {
        setCharacters([]);
        setPages(0);
        return;
      }

      setCharacters(data.results)
      setPages(data.info.pages)
    }

    fetchCharacters()
  }, []);


  characters && characters.sort((a, b) => {
    return a.name.localeCompare(b.name)
  });

  const clickOnCharacter = (character) => {
    navigate(`/characters/${character.id}`)
    setInputValue('')
  }

  const getInputValue = async (e) => {
    setInputValue(e.target.value);

    const data = await fetchData(`https://rickandmortyapi.com/api/character/?name=${e.target.value}`);
    if (!data) {
      setCharacters([]);
      setPages(0);
      return;
    }
    setCharacters(data.results)
    setPages(data.info.pages)
  }

  const setFilter = () => {
    localStorage.setItem('inputValue', inputValue);
    window.history.replaceState(null, '', `#/characters?page=1${inputValue && `&name=${inputValue}`}`);
  }

  return (
    <>
      <div>
        <h2>Google Login</h2>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
      <div className='characters'>
        <div className='characters__logo'>
          <img src='img/mainLogo.png'
            alt='logo' />
        </div>
        <div className='characters__filter'>
          <label>
            <input
              type='text'
              value={inputValue}
              className='characters__input'
              placeholder='Filter by name...'
              onChange={getInputValue}
              onBlur={setFilter} />
          </label>
          {inputValue && `Searched by: ${inputValue}`}
        </div>
        <ul className='characters__list'>
          {characters && characters.map((character) => {
            return (
              <li
                key={character.id}
                className='characters__item'
                onClick={() => { clickOnCharacter(character) }}
              >
                <div
                  className='characters__image'
                  style={{ 'backgroundImage': `url('${character.image}')` }} />
                <div className='characters__text'>
                  <h3>{character.name}</h3>
                  <div className='characters__text-species'>{character.species}</div>
                </div>
              </li>);
          })}
        </ul>
        {responseDiv && <div>{responseDiv}</div>
        }
        <Pagination
          fetchData={fetchData}
          setCharacters={setCharacters}
          setPages={setPages}
          inputValue={inputValue}
          pages={pages}
        />
      </div>
    </>
  )
}
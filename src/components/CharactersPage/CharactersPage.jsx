import './CharactersPage.css';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { Pagination } from './Pagination/Pagination';

export const CharactersPage = () => {
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
    console.log(error);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character${search}&name=${inputValue}`);

        if (response.status === 200) {
          const result = await response.json();
          setCharacters(result.results)
          setPages(result.info.pages)
        }

      } catch (error) {
        console.log(error)
      }
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
    console.log(e.target.value)
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${e.target.value}`,)
      if (response.status === 200) {
        const result = await response.json();
        setCharacters(result.results)
        setPages(result.info.pages)
      } else {
        setCharacters([])
        setPages(0)
      }
    } catch (error) {

      throw new Error(error)
    }
  }

  const setFilter = () => {
    localStorage.setItem('inputValue', inputValue);

    window.history.replaceState(null, "", `/characters?page=1${inputValue && `&name=${inputValue}`}`);
  }

  return (
    <>
      <div>
        <h2>Google Login</h2>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
      <div className="characters">
        <div className='characters__logo'>
          <img src="/img/mainLogo.png"
            alt="logo" />
        </div>
        <div className='characters__filter'>
          <label>
            <input
              type="text"
              value={inputValue}
              className='characters__input'
              placeholder='Filter by name...'
              onChange={getInputValue}
              onBlur={setFilter} />
          </label>
          {inputValue && `Searched by: ${inputValue}`}
        </div>
        <ul className="characters__list">
          {characters && characters.map((character) => {
            return (
              <li
                key={character.id}
                className="characters__item"
                onClick={() => { clickOnCharacter(character) }}
              >
                <div
                  className="characters__image"
                  style={{ 'backgroundImage': `url("${character.image}")` }} />
                <div className='characters__text'>
                  <h3>{character.name}</h3>
                  <div className='characters__text-species'>{character.species}</div>
                </div>
              </li>);
          })}
        </ul>
        <Pagination
          inputValue={inputValue}
          pages={pages}
        />
      </div>
    </>
  )
}
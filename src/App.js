import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CharactersPage } from './components/CharactersPage/CharactersPage.jsx';
import { Character } from './components/Character/Character';
import { useState } from 'react';

function App() {
  const [responseDiv, setResponseDiv]= useState('');

  const fetchData = async (link) => {
    try {
      const response = await fetch(link);

      if (response.status === 200) {
        const result = await response.json(); 
        setResponseDiv('')
        return result;
      } else {
        return setResponseDiv('Characters not found');
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/characters' />} />
        <Route
          path='/characters'
          element={<CharactersPage fetchData={fetchData} responseDiv={responseDiv} />} />
        <Route
          path='/characters/:id'
          element={<Character fetchData={fetchData} />} />
        <Route path='*' element={<div>No page</div>} />
      </Routes></>
  );
}

export default App;

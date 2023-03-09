import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CharactersPage } from './components/CharactersPage/CharactersPage.jsx';
import { Character } from './components/Character/Character';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/characters' />} />
        <Route
          path='/characters'
          element={<CharactersPage />} />
        <Route
          path='/characters/:id'
          element={<Character />} />
        <Route path='*' element={<div>No page</div>} />
      </Routes></>
  );
}

export default App;

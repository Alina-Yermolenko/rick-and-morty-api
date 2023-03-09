import './Pagination.css';
import { useLocation } from "react-router-dom";

export const Pagination = ({inputValue, pages}) => {
  const { search } = useLocation();

  const currentPage = search.includes('name') ? search.split('=')[1].slice(0,1) :  search.split('page=')[1];

  const clickOnPage = (index) => {
    window.history.replaceState(null, "", `/characters/?page=${index + 1}${inputValue && `&name=${inputValue}`}`);
    localStorage.setItem('page', index + 1);
  }

  return (
    <div className='pages'>
    {[...Array(pages)].map((page, index) => {
      return (
        <a
          key={index + 1}
          href={`/characters?page=${index + 1}${inputValue && `&name=${inputValue}`}`}
          onClick={() => { clickOnPage(index) }}
          className={`page ${+currentPage === +index + 1 ? 'active': ''}`}
        >
          {index + 1}
        </a>
      );
    })}
  </div>
  )
}
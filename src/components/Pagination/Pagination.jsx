import './Pagination.scss';
import { useLocation } from "react-router-dom";

export const Pagination = ({fetchData,inputValue, pages, setCharacters,setPages}) => {
  const { search } = useLocation();
  const currentPage = search.includes('name') ? search.split('=')[1].slice(0,1) :  search.split('page=')[1];

  const clickOnPage = async (index) => {
    const data = await fetchData(`https://rickandmortyapi.com/api/character?page=${index + 1}${inputValue && `&name=${inputValue}`}`)
    setCharacters(data.results)
    setPages(data.info.pages)
  }

  return (
    <div className='pages'>
    {[...Array(pages)].map((page, index) => {
      return (
        <a
          key={index + 1}
          href={`#/characters?page=${index + 1}${inputValue && `&name=${inputValue}`}`}
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
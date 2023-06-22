import { Layout } from '@/components/Layout'
import { Divider } from 'antd'
import { PokeCard } from '@/components/PokeCard'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchPokemon = async () => {
    const offset = (currentPage - 1) * pageSize;
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    console.log(data)
    setPokemons(data.results)
  
  }

  useEffect(() => {
    fetchPokemon()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize])

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    console.log(pokemons.length);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visiblePokemons = pokemons.slice(startIndex, endIndex);
  
  return (
    <Layout>
        <Divider orientation="left" style={{ fontSize: '18px' }}>Pokemon List</Divider>
        <div className={`flex flex-grow flex-wrap p-[10px] justify-center items-center gap-[10px]`}>
        {visiblePokemons.map((pokemon: any, index: number) => {
          const pokemonIndex = startIndex + index + 1;
          return (
            <PokeCard key={index} name={pokemon.name} image={`/pokemon/${pokemonIndex}.png`} id={pokemonIndex} />
          );
        })}
        </div>
        <div className={`flex justify-center mt-[20px]`}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={pokemons.length}
            onChange={handlePageChange}
          />
        </div>
        
    </Layout>
  )
}

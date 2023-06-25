import { Layout } from '@/components/Layout';
import { Divider } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import dynamic from 'next/dynamic';

const PokeCard = dynamic(() => import('@/components/PokeCard').then((module) => module.PokeCard));


export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPokemon = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      setPokemons(data.results)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
   
  
  }

  useEffect(() => {
    fetchPokemon()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = async (page: number, pageSize?: number) => {
    setCurrentPage(page)
    if (pageSize) {
      setPageSize(pageSize)
    }
  };

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const visiblePokemons = pokemons.slice(startIndex, endIndex)
  
  return (
    <Layout>
      <section className={`min-h-screen `} >
        <h1 className={`text-4xl font-semibold text-center`}>Catch Your Pokemon!</h1>
        <Divider orientation="left" style={{ fontSize: '18px' }}>Pokemon List</Divider>
        {isLoading ? 
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div> :
          <>
            <div className={`flex flex-grow flex-wrap p-[10px] justify-center items-center gap-[10px] `}>
              {visiblePokemons.map((pokemon: any, index: number) => {
                const pokemonIndex = startIndex + index + 1
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
          </>}
          
      </section>    
    </Layout>
  )
}

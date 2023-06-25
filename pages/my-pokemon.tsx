
import { Layout } from '@/components/Layout';
import { Divider } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PokemonDetailProps from '@/interfaces/PokemonDetailProps';
import Image from 'next/image';
import { removeFromInventory } from '@/redux/inventoryReducer';


export default function MyPokemon() {
    const dispatch = useDispatch()
    const [ownedPokemons, setOwnedPokemons] = useState([])
    const { inventory } = useSelector((state: any) => state.inventory)
    const [isLoading, setIsLoading] = useState(false)
    const fetchPokemon = async () => {
        setIsLoading(true)
        try {
          const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
          setOwnedPokemons(data.results.filter((pokemon: PokemonDetailProps) => {
            const inventoryNames = inventory.map( (item: { id: number; name: string }) => item.name)
            return inventoryNames.includes(pokemon.name);
          }))
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

    const handleRelease = async (item: { id: number; name: string }) => {
        setOwnedPokemons(ownedPokemons.filter((pokemon: PokemonDetailProps) => pokemon.name !== item.name))
        dispatch(removeFromInventory(item))
    }
    return (
        <Layout>
            <section className={`min-h-screen `}>
                {isLoading ? 
                 <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                 </div> :
                 <>
                    <Divider orientation="left" style={{ fontSize: '18px' }}>Owned Pokemons</Divider>
                    {inventory.length > 0 ? 
                    <div className={`flex flex-grow flex-wrap p-[10px] justify-center items-center gap-[10px]`}>
                        {isLoading ?
                            <div className="flex justify-center items-center h-screen">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                            </div> :
                            <div className={`flex flex-grow flex-wrap p-[10px] justify-center items-center gap-[10px]`}>
                                {ownedPokemons.map((pokemon: any, index: number) => {
                                    return (
                                        <div key={index} className="flex flex-col justify-center items-center gap-[10px]">
                                            <Image src={`/pokemon/${inventory.find( (item: { id: number; name: string }) => item.name === pokemon.name)?.id}.png`} alt={pokemon.name} width={300} height={300}  />
                                            <div className="text-center">
                                                <p className={`text-xl font-bold capitalize`}>{pokemon.name}</p>
                                                <button onClick={()=>handleRelease({ id: inventory.find( (item: { id: number; name: string }) => item.name === pokemon.name).id, name: pokemon.name })} className={`bg-orange-400 rounded-lg px-[10px] py-[5px] text-yellow-100 mt-[8px] border hover:bg-yellow-100 hover:text-orange-400 hover:border-orange-400`}>Release</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>  :
                    <div className={`flex justify-center items-center`}>
                        <p>You have no pokemon yet, try to catch them first!</p>
                    </div>
                    }
                 </>
                }          
            </section>   
        </Layout>
    )
}
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import Image from 'next/image';
import Link from "next/link";
import { useDispatch } from 'react-redux';
import PokemonDetailProps from '@/interfaces/PokemonDetailProps';
import { addToInventory } from '@/redux/inventoryReducer';


export default function PokemonDetail() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { id } = router.query
    const [pokemon, setPokemon] = useState<PokemonDetailProps>({
        id: 0,
        name: '',
        types: [
            {
                slot: 0,
                type: {
                    name: '',
                    url: '',
                }
            }
        ],
        height: 0,
        weight: 0,
        abilities: [
            {
                is_hidden: false,
                slot: 0,
                ability: {
                    name: '',
                    url: '',
                }
            }
        ],
        stats: [
            {
                base_stat: 0,
                effort: 0,
                stat: {
                    name: '',
                    url: '',
                }
            }
        ],
        moves: [
            {
                move: {
                    name: '',
                    url: '',
                },
                version_group_details: [
                    {
                        level_learned_at: 0,
                        version_group: {
                            name: '',
                            url: '',
                        },
                        move_learn_method: {
                            name: '',
                            url: '',
                        },
                    }
                ]
            }
        ]

    })

    const fetchPokemon = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        if (id) {
            fetchPokemon()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const catchPokemon = async () => {
        const isSuccessful = Math.random() < 0.5
        if (isSuccessful) {
            dispatch(addToInventory({id: pokemon.id, name: pokemon.name}))
            alert('Pokemon catched')
        }
        else {
            alert('Failed to catch pokemon')
        }
    }

    return(
        <Layout>
        <article className={`flex flex-col gap-4 `}>
            <section className={`flex   justify-center items-center py-[30px] `}>
                <Link href='/' className={`absolute left-36 hover:underline`} >Back</Link>
                <h1 className={`text-4xl font-bold capitalize`}>{pokemon.name}</h1>
            </section>
            <section className={`flex  justify-center items-center   pt-[10px]`}>
                <div className={`w-1/3`}>
                    <div className={`border fixed top-[240px] left-[150px] rounded flex flex-col justify-center items-center`}> 
                        <div className={`border-b p-[10px] `}>
                            <Image alt={`gambar-${id}`} src={`/pokemon/${id}.png`} width={300} height={300} />
                        </div>
                        <button onClick={catchPokemon} className={`bg-red-500 my-[10px] flex justify-center items-center rounded-full p-[10px] text-white w-[50px] h-[50px] border hover:bg-white hover:text-red-500 hover:border-red-500`}>Catch</button> 
                    </div>
                    
                </div>
                <div className={`w-2/3 `}>
                    <h2 className={`text-3xl font-bold`}>Information</h2>
                    <div className={`border p-[16px] rounded mt-[5px]`}>
                        <h2 className={`text-2xl font-bold`}>Types</h2>
                        <div className={`flex flex-wrap gap-4 mt-[5px]`}>
                            {pokemon.types.map((type, index) => {
                                return (
                                    <div key={index} className={`bg-gray-200 p-2 rounded-md flex items-center gap-[8px]`}>
                                        {type.type.name}
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <div className={`mt-4`}>
                            <h2 className={`text-2xl font-bold`}>Appearence</h2>
                            <div className={`flex flex-wrap gap-4 mt-[5px]`}>
                                <div className={`bg-gray-200 p-2 rounded-md`}>
                                    Height: {pokemon.height}
                                </div>
                                <div className={`bg-gray-200 p-2 rounded-md`}>
                                    Weight: {pokemon.weight}
                                </div>
                            </div>
                        </div>
                        <div className={`mt-4`}>
                            <h2 className={`text-2xl font-bold`}>Abilities</h2>
                            <div className={`flex flex-wrap gap-4 mt-[5px]`}>
                                {pokemon.abilities.map((ability, index) => {
                                    return (
                                        <div key={index} className={`bg-gray-200 p-2 rounded-md`}>
                                            {ability.ability.name}
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className={`mt-4`}>
                            <h2 className={`text-2xl font-bold`}>Stats</h2>
                            <div className={`flex flex-wrap gap-4 mt-[5px]`}>
                                {pokemon.stats.map((stat, index) => {
                                    return (
                                        <div key={index} className={`bg-gray-200 p-2 rounded-md flex items-center gap-[8px]` }>
                                            <div className={`text-sm font-bold`}>{stat.base_stat}</div>
                                            {stat.stat.name}

                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className={`mt-4`}>
                            <h2 className={`text-2xl font-bold`}>Moves</h2>
                            <div className={`flex flex-wrap gap-4 mt-[5px]`}>
                                {pokemon.moves.map((move, index) => {
                                    return (
                                        <div key={index} className={`bg-gray-200 p-2 rounded-md flex items-center gap-[8px]` }>
                                            <div className={`text-sm font-bold`}>{move.move.name}</div>
                                            
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
        </Layout>
    )
}
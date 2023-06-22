import { Layout } from '@/components/Layout'
import { Divider } from 'antd'
import { PokeCard } from '@/components/PokeCard'


export default function Home() {
  return (
    <Layout>
        <Divider orientation="left" style={{ fontSize: '18px' }}>Pokemon List</Divider>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}>
            <PokeCard name="Bulbasaur" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" id={1} />
            <PokeCard name="Ivysaur" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" id={2} />
            <PokeCard name="Venusaur" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" id={3} />
            <PokeCard name="Charmander" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" id={4} />
        </div>
    </Layout>
  )
}

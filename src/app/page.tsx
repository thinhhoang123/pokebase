import PokemonCard from '@/components/pokemon-card';
import getAllPokemon from '@/services/getAllPokemon';
import logging from '@/utils/logging';
import { Filter } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  const getAllPokemonData = await getAllPokemon();
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-center gap-2 sticky top-0 z-10 py-4">
        <label className="input">
          <Image
            src="/pokemon-logo.svg"
            width={20}
            height={20}
            alt="Pokemon logo"
            // className="animate-spin"
          />
          <input
            type="text"
            className="grow"
            placeholder="Search the pokemon"
          />
        </label>
        <button className="btn btn-square">
          <Filter size={16} />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6 mt-6">
        {getAllPokemonData?.data?.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      <div className="flex justify-center my-6">
        <button className="btn btn-neutral btn-lg">Load more</button>
      </div>
    </main>
  );
}


import LoadMoreButton from '@/components/load-more-btn';
import PokemonCard from '@/components/pokemon-card';
import getAllPokemon from '@/services/getAllPokemon';
// import logging from '@/utils/logging';
import { Filter } from 'lucide-react';
import Image from 'next/image';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams?.page || 1);
  const offset = page * 20;
  const getAllPokemonData = await getAllPokemon(offset);
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mt-12 mb-4">
        <Image src="/pokedex.svg" width={350} height={350} alt="pokedex" />
      </div>

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
        {getAllPokemonData?.data?.data?.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>

      <LoadMoreButton page={page} />
    </main>
  );
}


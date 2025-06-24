import getAllPokemon from '@/services/getAllPokemon';
import logging from '@/utils/logging';
import Image from 'next/image';

export default async function Home() {
  const getAllPokemonData = await getAllPokemon();
  logging.info(`getAllPokemonData: ${JSON.stringify(getAllPokemonData)}`);
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
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
      </div>
    </main>
  );
}


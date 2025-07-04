import PokemonList from '@/components/pokemon-list/pokemon-list';
import SearchInput from '@/components/search-input';
import { Filter } from 'lucide-react';
import Image from 'next/image';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mt-12 mb-4">
        <Image src="/pokedex.svg" width={350} height={350} alt="pokedex" />
      </div>

      <div className="flex justify-center gap-2 sticky top-0 z-10 py-4">
        <SearchInput />
        <button className="btn btn-square">
          <Filter size={16} />
        </button>
      </div>

      <PokemonList search={query} />
    </main>
  );
}


import FilterTypeBtn from '@/components/filter-type-btn';
import PokemonList from '@/components/pokemon-list/pokemon-list';
import SearchInput from '@/components/search-input';
import Image from 'next/image';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    types?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const types = searchParams?.types || '';

  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mt-12 mb-4">
        <Image src="/pokedex.svg" width={350} height={350} alt="pokedex" />
      </div>

      <div className="flex justify-center items-center gap-2 sticky top-0 z-10 py-4">
        <SearchInput value={query} />
        <FilterTypeBtn
          types={
            types === ''
              ? new Map()
              : new Map(
                  types
                    .split(',')
                    .map((k) => k.trim())
                    .map((key) => [key, key])
                )
          }
        />
      </div>

      <PokemonList
        search={query}
        types={types === '' ? [] : types.split(',')}
      />
    </main>
  );
}


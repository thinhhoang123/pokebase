'use client';

import PokemonCard from './pokemon-card';
import { useQuery } from '@tanstack/react-query';
import getAllPokemon from '@/services/getAllPokemon';
import { useEffect, useState } from 'react';
import PokemonCardSkeleton from './pokemon-card-skeleton';

export default function PokemonList({ search }: { search: string }) {
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const LIMIT = 20;

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['pokemonList', page, search],
    queryFn: async () => {
      const response = await getAllPokemon(LIMIT, page * LIMIT, search);
      if (response) {
        setPokemons((prev) => [...prev, ...response.data.data]);
      }
      return response;
    },
  });

  useEffect(() => {
    setPage(0);
    setPokemons([]);
  }, [search]);

  const loadingSkeleton = Array.from({ length: LIMIT }, (_, i) => i)?.map(
    (pokemon) => <PokemonCardSkeleton key={pokemon} />
  );

  const isShowLoadMoreButton =
    pokemons.length > 0 &&
    !isLoading &&
    !isFetching &&
    data?.data?.total?.aggregate?.count > pokemons.length;

  return (
    <>
      <div className="grid grid-cols-5 gap-6 mt-6">
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        {(isLoading || isFetching) && loadingSkeleton}
      </div>
      {isShowLoadMoreButton && (
        <div className="flex justify-center mt-12">
          <button
            className="btn btn-neutral btn-lg btn-ghost"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}

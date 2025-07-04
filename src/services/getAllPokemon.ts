'use server';
import logging from '@/utils/logging';

const getAllPokemon = async (limit: number, offset: number, search: string) => {
  const query = `
    query getAllPokemon {
      data: pokemon(limit: ${limit}, offset: ${offset} where: {name: {_ilike: "%${
    search || ''
  }%"}}) {
        name
        id
        types: pokemontypes {
          data: type {
            name
          }
        }
        sprites: pokemonsprites {
          sprites
        }
      }
      total: pokemon_aggregate(where: {name: {_ilike: "%${search || ''}%"}}) {
        aggregate {
          count
        }
      }
    }
  `;

  try {
    const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    logging.info('Fetching all Pokémon data');
    return await response.json();
  } catch (err) {
    logging.error(`Error during fetch all Pokémon data: ${err}`);
  }
};

export default getAllPokemon;

'use server';
import log from '@/utils/logging';

export const getAllPokemon = async (
  limit: number,
  offset: number,
  search: string,
  types: string[]
) => {
  const filterTypes = types.length
    ? `
   pokemontypes:  {
          type:  {
             name:  {
                _in: ["${types.join('", "')}"]
             }
          }
       }
  `
    : '';
  const query = `
    query getAllPokemon {
      data: pokemon(limit: ${limit}, offset: ${offset} where: 
      {
        name: {_ilike: "%${search || ''}%"}
        _and: [{${filterTypes}}]
      }) {
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

  console.log(query);
  try {
    const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    log.info('Fetching all Pokémon data');
    return await response.json();
  } catch (err) {
    log.error(`Error during fetch all Pokémon data: ${err}`);
  }
};
export const getAllTypes = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type?limit=50', {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    log.error(`Error during fetch all Pokémon data: ${err}`);
  }
};

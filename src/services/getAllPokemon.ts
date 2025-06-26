import { gql, GraphQLClient } from 'graphql-request';
import client from './client';
import logging from '@/utils/logging';

const getAllPokemon = async () => {
  const query = gql`
    query getAllPokemon {
      data: pokemon(limit: 20) {
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
    }
  `;

  try {
    const response: GraphQLClient = await client.request(query);
    logging.info('Fetching all Pokémon data');
    return response;
  } catch (err) {
    logging.error(`Error during fetch all Pokémon data: ${err}`);
  }
};

export default getAllPokemon;

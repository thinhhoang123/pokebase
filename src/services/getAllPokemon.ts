import { gql, GraphQLClient } from 'graphql-request';
import client from './client';
import logging from '@/utils/logging';

const getAllPokemon = async () => {
  const query = gql`
    query getAllPokemon {
      data: pokemon_v2_pokemon(limit: 10) {
        name
        id
        types: pokemon_v2_pokemontypes {
          data: pokemon_v2_type {
            name
          }
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

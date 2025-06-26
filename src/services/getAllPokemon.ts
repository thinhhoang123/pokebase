'use server';
import { gql, GraphQLClient } from 'graphql-request';
import client from './client';
import logging from '@/utils/logging';

const getAllPokemon = async (offset: number) => {
  const query = gql`
    query getAllPokemon {
      data: pokemon(limit: ${offset}) {
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
    const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query }),
      next: {
        tags: ['pokemonList'],
      },
    });
    logging.info('Fetching all Pokémon data');
    return await response.json();
  } catch (err) {
    logging.error(`Error during fetch all Pokémon data: ${err}`);
  }
};

export default getAllPokemon;

import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

export type Pokemon = {
  classification?: string;
  fleeRate?: string;
  height?: Dimensions;
  id: string;
  image: string;
  maxCP?: string;
  maxHP?: string;
  name: string;
  number: number;
  resistant?: Array<string>;
  types: Array<string>;
  weaknesses?: Array<string>;
  weight?: Dimensions;
};

export type Dimensions = {
  minimum: string;
  maximum: string;
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
      image
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemons = () => {
  const { data, loading, error } = useQuery<{ pokemons: Pokemon[] }>(GET_POKEMONS, {
    variables: { first: 151 },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  return { pokemons, loading, error };
};

export const useGetPokemonDetails = (id?: string) => {
  const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON_DETAILS, {
    variables: { id },
  });

  const pokemon = data?.pokemon;

  const pokemonDetails = useMemo(
    () => ({
      classification: pokemon?.classification,
      fleeRate: pokemon?.fleeRate,
      height: pokemon?.height,
      image: pokemon?.image,
      name: pokemon?.name,
      maxCP: pokemon?.maxCP,
      maxHP: pokemon?.maxHP,
      resistant: pokemon?.resistant,
      number: pokemon?.number,
      types: pokemon?.types,
      value: pokemon?.id,
      weaknesses: pokemon?.weaknesses,
      weight: pokemon?.weight,
    }),
    [pokemon]
  );

  return { pokemonDetails, loading, error };
};

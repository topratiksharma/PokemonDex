import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

export type PokemonOption = {
  classification?: Pokemon['classification'];
  fleeRate?: Pokemon['fleeRate'];
  height?: Pokemon['height'];
  image: Pokemon['image'];
  name: Pokemon['name'];
  maxCP?: Pokemon['maxCP'];
  maxHP?: Pokemon['maxHP'];
  resistant?: Pokemon['resistant'];
  number: Pokemon['number'];
  types: Pokemon['types'];
  value: Pokemon['id'];
  weaknesses?: Pokemon['weaknesses'];
  weight?: Pokemon['weight'];
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
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () =>
      pokemons.map((p: Pokemon) => ({
        value: p.id,
        name: p.name,
        number: p.number,
        types: p.types,
        image: p.image,
      })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};

export const useGetPokemonDetails = (id?: string) => {

  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: id },
  });

  let pokemon: Pokemon = data?.pokemon;

  let pokemonDetails = useMemo(
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

  return {
    pokemonDetails,
    ...queryRes,
  };
};

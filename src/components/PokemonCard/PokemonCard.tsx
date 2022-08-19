import { createUseStyles } from 'react-jss';
import React from 'react';
import { Chip } from '@mui/material';

type Props = {
  id: string;
  name: string;
  image: string;
  types: string[];
  number: number;
};

export const PokemonCard: React.FC<Props> = ({
  id,
  name,
  image,
  types,
  number,
}) => {
  const classes: any = useStyles();

  return (
    <div>
      <div
        key={id}
        className={
          classes.thumbContainer + ' ' + classes[types[0].toLowerCase()]
        }
      >
        <label className={classes.number}>{'#0' + number}</label>
        <img src={image} alt={name} className={classes.img}></img>
        <div className={classes.detailWrapper}>
          <h3 className={classes.label}>{name}</h3>
          <small className={classes.label}>{types.join(', ')}</small>
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    thumbContainer: {
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid transparent',
      borderRadius: '0.8rem',
      boxShadow: '0 3px 15px rgba(0, 0, 0, 0.089)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0.3rem',
      minWidth: '160px',
      padding: '1.5rem 0',
      textAlign: 'center',
      zIndex: 1,
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
        transition: 'transform .2s ease-in-out',
      },
    },
    bug: { backgroundColor: '#F6D6A7' },
    dragon: { backgroundColor: '#FBE3DF' },
    electric: { backgroundColor: '#ffffa1' },
    fairy: { backgroundColor: '#ffc0cbdc' },
    fighting: { backgroundColor: '#a1a6f9' },
    fire: { backgroundColor: '#FFC107' },
    ghost: { backgroundColor: 'rgb(247, 247, 247)' },
    grass: { backgroundColor: '#E2F9E1' },
    ground: { backgroundColor: '#9e9e9e' },
    ice: { backgroundColor: '#00BCD4' },
    normal: { backgroundColor: 'white' },
    poison: { backgroundColor: '#eac6f7' },
    psychic: { backgroundColor: '#CDDC39' },
    rock: { backgroundColor: '#c49393' },
    water: { backgroundColor: '#b4defb' },
    number: {
      color: '#3e3232',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    label: { marginBottom: '0.2rem', color: '#000000' },
    img: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
    },
    detailWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  { name: 'PokemonCard' }
);

export default PokemonCard;

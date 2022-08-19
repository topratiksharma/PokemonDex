import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';

import Dialog from '@mui/material/Dialog';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery,
  Zoom,
  useTheme
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

export interface PokemonDialogProps {
  open: boolean;
}

export const PokemonDialog: React.FC<PokemonDialogProps> = ({ open }) => {
  const params = useParams();

  const { pokemonDetails, loading } = useGetPokemonDetails(params.id);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const classes: any = useStyles();

  const handleClose = () => {
    navigate('/pokemon');
  };

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
      {!loading && pokemonDetails?.name && (
        <div className={classes.root}>
          <Card sx={{ maxWidth: 500 }}>
            <Tooltip
              title="Close"
              placement="bottom"
              TransitionComponent={Zoom}
            >
              <IconButton className={classes.close} onClick={handleClose}>
                <CloseOutlined color="success" />
              </IconButton>
            </Tooltip>
            <DialogTitle classes={classes.title}>
              {pokemonDetails.name}
            </DialogTitle>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={pokemonDetails.image}
                className={classes.image}
                alt={pokemonDetails.name}
              />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table
                    aria-label="simple table"
                    size="small"
                    sx={{ minWidth: 250 }}
                    className={classes.table}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Classification</TableCell>
                        <TableCell align="right">
                          {pokemonDetails.classification}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Types</TableCell>
                        <TableCell align="right">
                          {pokemonDetails.types.join(', ')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resistant to</TableCell>
                        <TableCell align="right">
                          {pokemonDetails?.resistant?.join(', ')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weaknesses</TableCell>
                        <TableCell align="right">
                          {pokemonDetails?.weaknesses?.join(', ')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Height (min-max)</TableCell>
                        <TableCell align="right">
                          {pokemonDetails?.height?.minimum} -{' '}
                          {pokemonDetails?.height?.maximum}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weight (min-max)</TableCell>
                        <TableCell align="right">
                          {pokemonDetails?.weight?.minimum} -{' '}
                          {pokemonDetails?.weight?.maximum}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Max CP</TableCell>
                        <TableCell align="right">
                          {pokemonDetails.maxCP}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Max HP</TableCell>
                        <TableCell align="right">
                          {pokemonDetails.maxHP}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Flee rate</TableCell>
                        <TableCell align="right">
                          {pokemonDetails.fleeRate}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )}
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Poppins, Roboto, sans-serif',
      '& h2': {
        color: '#000000',
        fontFamily: 'Poppins, Roboto, sans-serif',
        fontSize: '32px',
        lineHeight: 'inherit',
        fontWeight: 'bold',
        padding: '14px 0px',
      },
    },
    image: {
      width: '125px !important',
      height: ' 125px',
      marginLeft: '35%',
      objectFit: 'contain !important',
    },
    close: {
      position: 'absolute !important',
      top: '0px !important',
      right: '0px !important',
      background: 'transparent !important',
      padding: '2px !important',
      cursor: 'pointer !important',
      '& path': {
        color: 'black',
      },
    },
    table: {
      fontFamily: 'Poppins, Roboto, sans-serif',
    },
  },
  { name: 'PokemonDialog' }
);

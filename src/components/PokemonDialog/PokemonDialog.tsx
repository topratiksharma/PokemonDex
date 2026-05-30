import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
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
  useTheme,
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

  return (
    <Dialog onClose={() => navigate(-1)} open={open} fullScreen={fullScreen}>
      {!loading && pokemonDetails?.name && (
        <div className="flex items-center box-border flex-col justify-center text-center font-[Poppins,Roboto,sans-serif]">
          <Card sx={{ maxWidth: 500 }}>
            <Tooltip title="Close" placement="bottom" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{ position: 'absolute', top: 0, right: 0, p: '2px', background: 'transparent', cursor: 'pointer' }}
              >
                <CloseOutlined color="success" />
              </IconButton>
            </Tooltip>
            <DialogTitle>{pokemonDetails.name}</DialogTitle>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={pokemonDetails.image}
                alt={pokemonDetails.name}
                sx={{ width: '125px', height: '125px', ml: '35%', objectFit: 'contain' }}
              />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="pokemon details" size="small" sx={{ minWidth: 250, fontFamily: 'Poppins, Roboto, sans-serif' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Classification</TableCell>
                        <TableCell align="right">{pokemonDetails.classification}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Types</TableCell>
                        <TableCell align="right">{pokemonDetails.types?.join(', ')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resistant to</TableCell>
                        <TableCell align="right">{pokemonDetails?.resistant?.join(', ')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weaknesses</TableCell>
                        <TableCell align="right">{pokemonDetails?.weaknesses?.join(', ')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Height (min-max)</TableCell>
                        <TableCell align="right">
                          {pokemonDetails?.height?.minimum} – {pokemonDetails?.height?.maximum}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weight (min-max)</TableCell>
                        <TableCell align="right">
                          {pokemonDetails?.weight?.minimum} – {pokemonDetails?.weight?.maximum}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Max CP</TableCell>
                        <TableCell align="right">{pokemonDetails.maxCP}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Max HP</TableCell>
                        <TableCell align="right">{pokemonDetails.maxHP}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Flee rate</TableCell>
                        <TableCell align="right">{pokemonDetails.fleeRate}</TableCell>
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

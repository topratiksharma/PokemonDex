import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
import {
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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

const TYPE_COLORS: Record<string, string> = {
  fire: '#FFC107', water: '#b4defb', grass: '#E2F9E1', electric: '#ffffa1',
  psychic: '#CDDC39', ice: '#b3e8f0', dragon: '#FBE3DF', fairy: '#ffc0cb',
  fighting: '#a1a6f9', poison: '#eac6f7', ground: '#d4c5a9', rock: '#c49393',
  ghost: '#e8d5f5', bug: '#F6D6A7', normal: '#f0ede8', steel: '#cbd5e1', flying: '#e2e8f0',
  dark: '#a08070',
};

export const PokemonDialog: React.FC<PokemonDialogProps> = ({ open }) => {
  const params = useParams();
  const { pokemonDetails, loading } = useGetPokemonDetails(params.id);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const primaryType = pokemonDetails?.types?.[0]?.toLowerCase() ?? 'normal';
  const headerBg = TYPE_COLORS[primaryType] ?? '#f0ede8';

  const fleeRateFormatted = pokemonDetails?.fleeRate != null
    ? `${(Number(pokemonDetails.fleeRate) * 100).toFixed(0)}%`
    : '—';

  const rows: [string, React.ReactNode][] = pokemonDetails ? [
    ['Classification', pokemonDetails.classification],
    ['Resistant to', pokemonDetails.resistant?.join(', ') || '—'],
    ['Weaknesses', pokemonDetails.weaknesses?.join(', ') || '—'],
    ['Height', `${pokemonDetails.height?.minimum} – ${pokemonDetails.height?.maximum}`],
    ['Weight', `${pokemonDetails.weight?.minimum} – ${pokemonDetails.weight?.maximum}`],
    ['Max CP', pokemonDetails.maxCP],
    ['Max HP', pokemonDetails.maxHP],
    ['Flee rate', fleeRateFormatted],
  ] : [];

  return (
    <Dialog
      onClose={() => navigate(-1)}
      open={open}
      fullScreen={fullScreen}
      PaperProps={{ sx: { borderRadius: fullScreen ? 0 : 3, overflow: 'hidden', minWidth: 320, maxWidth: 480 } }}
    >
      {loading && (
        <div className="flex items-center justify-center w-full h-64">
          <CircularProgress />
        </div>
      )}

      {!loading && pokemonDetails?.name && (
        <div className="flex flex-col max-h-[90vh] md:max-h-[80vh]">
          {/* Coloured header band */}
          <div style={{ background: headerBg }} className="relative flex flex-col items-center pt-8 pb-4 px-6 shrink-0">
            <Tooltip title="Close" placement="bottom" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{ position: 'absolute', top: 8, right: 8, color: 'rgba(0,0,0,0.5)', '&:hover': { background: 'rgba(0,0,0,0.08)' } }}
                size="small"
                aria-label="Close dialog"
              >
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <img
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
              className="w-32 h-32 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
            />
            <h2 className="mt-2 text-2xl font-bold text-black/80 capitalize">{pokemonDetails.name}</h2>
            <p className="text-sm text-black/50 font-mono">{'#' + String(pokemonDetails.number ?? 0).padStart(3, '0')}</p>
            <Stack direction="row" spacing={1} mt={1}>
              {pokemonDetails.types?.map((t) => (
                <Chip key={t} label={t} size="small" sx={{ fontWeight: 600, fontSize: 11, background: 'rgba(0,0,0,0.18)', color: 'rgba(0,0,0,0.75)' }} />
              ))}
            </Stack>
          </div>

          {/* Stats table — scrollable */}
          <CardContent sx={{ p: 0, overflowY: 'auto', flex: 1 }}>
            <TableContainer component={Paper} elevation={0}>
              <Table size="small">
                <TableBody>
                  {rows.map(([label, value]) => (
                    <TableRow key={label} sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ color: 'text.secondary', fontSize: 13, py: 1.25, fontWeight: 400, width: '45%' }}>
                        {label}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, py: 1.25, fontWeight: 600, color: 'text.primary' }}>
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </div>
      )}
    </Dialog>
  );
};

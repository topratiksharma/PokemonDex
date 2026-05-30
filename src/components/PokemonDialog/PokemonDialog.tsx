import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';

export interface PokemonDialogProps {
  open: boolean;
}

const TYPE_ACCENT: Record<string, string> = {
  bug:      '#6E8230',
  dragon:   '#5846A0',
  electric: '#9A7818',
  fairy:    '#9A4870',
  fighting: '#8A5838',
  fire:     '#A05628',
  ghost:    '#585690',
  grass:    '#4A7856',
  ground:   '#8E6C38',
  ice:      '#407898',
  normal:   '#6E7680',
  poison:   '#6E4290',
  psychic:  '#9A3C60',
  rock:     '#7E6C5E',
  water:    '#2E6698',
  flying:   '#425E98',
  steel:    '#4E6498',
  dark:     '#4A4640',
};

export const PokemonDialog: React.FC<PokemonDialogProps> = ({ open }) => {
  const params = useParams();
  const { pokemonDetails, loading } = useGetPokemonDetails(params.id);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const primaryType = pokemonDetails?.types?.[0]?.toLowerCase() ?? 'normal';
  const accent = TYPE_ACCENT[primaryType] ?? '#6E7680';

  const fleeRate = pokemonDetails?.fleeRate != null
    ? `${(Number(pokemonDetails.fleeRate) * 100).toFixed(0)}%`
    : '—';

  const rows: [string, React.ReactNode][] = pokemonDetails ? [
    ['Classification', pokemonDetails.classification],
    ['Height', `${pokemonDetails.height?.minimum} – ${pokemonDetails.height?.maximum}`],
    ['Weight', `${pokemonDetails.weight?.minimum} – ${pokemonDetails.weight?.maximum}`],
    ['Max CP', pokemonDetails.maxCP],
    ['Max HP', pokemonDetails.maxHP],
    ['Flee rate', fleeRate],
    ['Resistant to', pokemonDetails.resistant?.join(', ') || '—'],
    ['Weaknesses', pokemonDetails.weaknesses?.join(', ') || '—'],
  ] : [];

  return (
    <Dialog
      onClose={() => navigate(-1)}
      open={open}
      fullScreen={fullScreen}
      BackdropProps={{ sx: { background: 'var(--c-backdrop)', backdropFilter: 'blur(6px)' } }}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : '14px',
          overflow: 'hidden',
          minWidth: 340,
          maxWidth: 400,
          width: '100%',
          background: 'var(--c-dialog)',
          border: '1px solid var(--c-rim-dialog)',
          boxShadow: 'var(--c-dialog-shadow)',
          margin: fullScreen ? 0 : '16px',
        },
      }}
    >
      {loading && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', width: '100%', height: '220px', gap: '12px',
        }}>
          <CircularProgress size={18} sx={{ color: 'var(--c-text-3)' }} />
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px', color: 'var(--c-text-3)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            Loading
          </span>
        </div>
      )}

      {!loading && pokemonDetails?.name && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Header — sprite + identity, unified */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '36px 20px 20px',
          }}>
            {/* Close button */}
            <button
              onClick={() => navigate(-1)}
              style={{
                position: 'absolute', top: '12px', right: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '26px', height: '26px',
                borderRadius: '6px',
                background: 'var(--c-close-btn)',
                border: '1px solid var(--c-rim)',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-close-btn-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--c-close-btn)')}
              aria-label="Close"
            >
              <span className="material-icons" style={{ color: 'var(--c-text-2)', fontSize: '14px' }}>close</span>
            </button>

            {/* Sprite with aura */}
            <div style={{
              width: '100px', height: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              marginBottom: '14px',
            }}>
              <div style={{
                position: 'absolute', inset: '-10px', borderRadius: '50%',
                background: `radial-gradient(circle, ${accent}28 0%, transparent 68%)`,
              }} />
              <img
                src={pokemonDetails.image}
                alt={pokemonDetails.name}
                className="sprite-img"
                style={{ width: '90px', height: '90px', objectFit: 'contain', position: 'relative', zIndex: 1 }}
              />
            </div>

            {/* Number */}
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              color: 'var(--c-text-3)',
              letterSpacing: '0.10em',
              marginBottom: '4px',
            }}>
              #{String(pokemonDetails.number ?? 0).padStart(3, '0')}
            </span>

            {/* Name */}
            <h2 style={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              fontSize: '24px',
              color: 'var(--c-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: '12px',
              textTransform: 'capitalize',
            }}>
              {pokemonDetails.name}
            </h2>

            {/* Type badges */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {pokemonDetails.types?.map((t) => {
                const ta = TYPE_ACCENT[t.toLowerCase()] ?? accent;
                return (
                  <span
                    key={t}
                    style={{
                      background: `${ta}12`,
                      color: ta,
                      border: `1px solid ${ta}24`,
                      borderRadius: '5px',
                      padding: '3px 9px',
                      fontSize: '11px',
                      fontWeight: 500,
                      lineHeight: 1,
                      fontFamily: '"Figtree", sans-serif',
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--c-rim-stat)', margin: '0 16px' }} />

          {/* Stats — table layout */}
          <div style={{ padding: '4px 20px 20px' }}>
            {rows.map(([label, value], i) => (
              <div
                key={label as string}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '8px 0',
                  borderBottom: i < rows.length - 1 ? '1px solid var(--c-rim-stat)' : 'none',
                }}
              >
                <span style={{
                  fontSize: '10px',
                  color: 'var(--c-text-stat-label)',
                  fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                  width: '86px',
                  paddingTop: '1px',
                  lineHeight: 1.5,
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: '12.5px',
                  fontWeight: 500,
                  color: 'var(--c-text-stat-value)',
                  lineHeight: 1.5,
                  fontFamily: '"Figtree", sans-serif',
                  flex: 1,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Dialog>
  );
};

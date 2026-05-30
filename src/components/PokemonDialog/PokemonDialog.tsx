import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';

export interface PokemonDialogProps {
  open: boolean;
}

const TYPE_ACCENT: Record<string, string> = {
  bug:      '#748F3F',
  dragon:   '#6154A0',
  electric: '#A8880C',
  fairy:    '#A85A7C',
  fighting: '#986048',
  fire:     '#B86A38',
  ghost:    '#6060A0',
  grass:    '#538A60',
  ground:   '#9A7848',
  ice:      '#4888A0',
  normal:   '#7A8490',
  poison:   '#8050A0',
  psychic:  '#A04870',
  rock:     '#8A7C68',
  water:    '#3C78B0',
  flying:   '#5070A8',
  steel:    '#5878A0',
  dark:     '#585048',
};

const s = {
  root: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
  },
  header: (accent: string): React.CSSProperties => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px 20px',
    flexShrink: 0,
    background: `${accent}0C`,
    borderBottom: '1px solid var(--c-rim-nav)',
  }),
  closeBtn: (): React.CSSProperties => ({
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'var(--c-close-btn)',
    border: '1px solid var(--c-rim)',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  }),
  identity: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    padding: '16px 24px 12px',
    flexShrink: 0,
  },
  number: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '10px',
    color: 'var(--c-text-3)',
    letterSpacing: '0.12em',
    marginBottom: '4px',
  },
  name: {
    fontFamily: '"Bricolage Grotesque", sans-serif',
    fontWeight: 700,
    fontSize: '26px',
    color: 'var(--c-text)',
    letterSpacing: '-0.025em',
    lineHeight: 1,
    marginBottom: '10px',
    textTransform: 'capitalize' as const,
  },
  typesRow: {
    display: 'flex' as const,
    gap: '6px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center' as const,
  },
  statsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: '1fr 1fr',
    gap: '1px',
    background: 'var(--c-rim-stat)',
    borderTop: '1px solid var(--c-rim-stat)',
  },
  statCell: (wide: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '10px 16px',
    background: 'var(--c-stat-cell)',
    gridColumn: wide ? 'span 2' : 'span 1',
  }),
  statLabel: {
    fontSize: '9.5px',
    color: 'var(--c-text-stat-label)',
    fontFamily: '"JetBrains Mono", monospace',
    letterSpacing: '0.07em',
    textTransform: 'uppercase' as const,
  },
  statValue: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--c-text-stat-value)',
    lineHeight: 1.3,
    fontFamily: '"Instrument Sans", sans-serif',
  },
};

export const PokemonDialog: React.FC<PokemonDialogProps> = ({ open }) => {
  const params = useParams();
  const { pokemonDetails, loading } = useGetPokemonDetails(params.id);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const primaryType = pokemonDetails?.types?.[0]?.toLowerCase() ?? 'normal';
  const accent = TYPE_ACCENT[primaryType] ?? '#7A8490';

  const fleeRate = pokemonDetails?.fleeRate != null
    ? `${(Number(pokemonDetails.fleeRate) * 100).toFixed(0)}%`
    : '—';

  const rows: [string, React.ReactNode, boolean][] = pokemonDetails ? [
    ['Classification', pokemonDetails.classification, true],
    ['Height', `${pokemonDetails.height?.minimum} – ${pokemonDetails.height?.maximum}`, false],
    ['Weight', `${pokemonDetails.weight?.minimum} – ${pokemonDetails.weight?.maximum}`, false],
    ['Max CP', pokemonDetails.maxCP, false],
    ['Max HP', pokemonDetails.maxHP, false],
    ['Flee rate', fleeRate, true],
    ['Resistant to', pokemonDetails.resistant?.join(', ') || '—', true],
    ['Weaknesses', pokemonDetails.weaknesses?.join(', ') || '—', true],
  ] : [];

  return (
    <Dialog
      onClose={() => navigate(-1)}
      open={open}
      fullScreen={fullScreen}
      BackdropProps={{ sx: { background: 'var(--c-backdrop)', backdropFilter: 'blur(4px)' } }}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : '16px',
          overflow: 'hidden',
          minWidth: 340,
          maxWidth: 420,
          width: '100%',
          background: 'var(--c-dialog)',
          border: '1px solid var(--c-rim-dialog)',
          boxShadow: 'var(--c-dialog-shadow)',
          margin: fullScreen ? 0 : '16px',
        },
      }}
    >
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '240px', gap: '14px' }}>
          <CircularProgress size={20} sx={{ color: 'var(--c-text-3)' }} />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--c-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Loading
          </span>
        </div>
      )}

      {!loading && pokemonDetails?.name && (
        <div style={s.root}>

          {/* Header */}
          <div style={s.header(accent)}>
            <button
              onClick={() => navigate(-1)}
              style={s.closeBtn()}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-close-btn-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--c-close-btn)')}
              aria-label="Close"
            >
              <span className="material-icons" style={{ color: 'var(--c-text-2)', fontSize: '15px' }}>close</span>
            </button>

            {/* Sprite */}
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '12px',
              background: 'var(--c-sprite-circle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={pokemonDetails.image}
                alt={pokemonDetails.name}
                className="sprite-img"
                style={{ width: '96px', height: '96px', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Identity */}
          <div style={s.identity}>
            <span style={s.number}>#{String(pokemonDetails.number ?? 0).padStart(3, '0')}</span>
            <h2 style={s.name}>{pokemonDetails.name}</h2>
            <div style={s.typesRow}>
              {pokemonDetails.types?.map((t) => {
                const ta = TYPE_ACCENT[t.toLowerCase()] ?? accent;
                return (
                  <span
                    key={t}
                    style={{
                      background: `${ta}14`,
                      color: ta,
                      border: `1px solid ${ta}28`,
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontSize: '11px',
                      fontWeight: 500,
                      lineHeight: 1,
                      fontFamily: '"Instrument Sans", sans-serif',
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Stats grid */}
          <div style={s.statsGrid}>
            {rows.map(([label, value, wide]) => (
              <div key={label as string} style={s.statCell(wide)}>
                <span style={s.statLabel}>{label}</span>
                <span style={s.statValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Dialog>
  );
};

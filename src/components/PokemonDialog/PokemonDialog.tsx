import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';

export interface PokemonDialogProps {
  open: boolean;
}

const TYPE_ACCENT: Record<string, string> = {
  bug:      '#84CC16',
  dragon:   '#8B5CF6',
  electric: '#EAB308',
  fairy:    '#F472B6',
  fighting: '#EF4444',
  fire:     '#F97316',
  ghost:    '#818CF8',
  grass:    '#4ADE80',
  ground:   '#F59E0B',
  ice:      '#22D3EE',
  normal:   '#94A3B8',
  poison:   '#C084FC',
  psychic:  '#FB7185',
  rock:     '#A8A29E',
  water:    '#38BDF8',
  flying:   '#7DD3FC',
  steel:    '#93C5FD',
  dark:     '#A8A29E',
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
    paddingTop: '32px',
    paddingBottom: '16px',
    paddingLeft: '24px',
    paddingRight: '24px',
    flexShrink: 0,
    background: `linear-gradient(160deg, ${accent}22 0%, transparent 55%)`,
    borderBottom: '1px solid var(--c-rim-nav)',
  }),
  glow: (accent: string): React.CSSProperties => ({
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '180px',
    height: '130px',
    background: `radial-gradient(ellipse, ${accent}28 0%, transparent 68%)`,
    pointerEvents: 'none',
  }),
  closeBtn: (): React.CSSProperties => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--c-close-btn)',
    border: '1px solid var(--c-rim)',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  }),
  identity: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    padding: '12px 24px 10px',
    flexShrink: 0,
  },
  number: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '10px',
    color: 'var(--c-text-3)',
    letterSpacing: '0.15em',
    marginBottom: '4px',
  },
  name: {
    fontFamily: '"Syne", sans-serif',
    fontWeight: 700,
    fontSize: '26px',
    color: 'var(--c-text)',
    letterSpacing: '-0.02em',
    lineHeight: 1,
    marginBottom: '8px',
    textTransform: 'capitalize' as const,
  },
  typesRow: {
    display: 'flex' as const,
    gap: '5px',
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
    gap: '1px',
    padding: '8px 14px',
    background: 'var(--c-stat-cell)',
    gridColumn: wide ? 'span 2' : 'span 1',
  }),
  statLabel: {
    fontSize: '9.5px',
    color: 'var(--c-text-stat-label)',
    fontFamily: '"JetBrains Mono", monospace',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  statValue: {
    fontSize: '12.5px',
    fontWeight: 600,
    color: 'var(--c-text-stat-value)',
    lineHeight: 1.3,
    fontFamily: '"Figtree", sans-serif',
  },
};

export const PokemonDialog: React.FC<PokemonDialogProps> = ({ open }) => {
  const params = useParams();
  const { pokemonDetails, loading } = useGetPokemonDetails(params.id);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const primaryType = pokemonDetails?.types?.[0]?.toLowerCase() ?? 'normal';
  const accent = TYPE_ACCENT[primaryType] ?? '#94A3B8';

  const fleeRate = pokemonDetails?.fleeRate != null
    ? `${(Number(pokemonDetails.fleeRate) * 100).toFixed(0)}%`
    : '—';

  // [label, value, wide] — wide spans 2 columns
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
      BackdropProps={{ sx: { background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' } }}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : '24px',
          overflow: 'hidden',
          minWidth: 340,
          maxWidth: 440,
          width: '100%',
          background: 'var(--c-dialog)',
          border: '1px solid var(--c-rim-dialog)',
          boxShadow: 'var(--c-dialog-shadow)',
          margin: fullScreen ? 0 : '16px',
        },
      }}
    >
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '260px', gap: '16px' }}>
          <CircularProgress size={22} sx={{ color: 'var(--c-loading-text)' }} />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--c-loading-text)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Loading
          </span>
        </div>
      )}

      {!loading && pokemonDetails?.name && (
        <div style={s.root}>

          {/* Hero header */}
          <div style={s.header(accent)}>
            {/* Atmospheric glow */}
            <div aria-hidden="true" style={s.glow(accent)} />

            {/* Close button */}
            <button
              onClick={() => navigate(-1)}
              style={s.closeBtn()}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-close-btn-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--c-close-btn)')}
              aria-label="Close"
            >
              <span className="material-icons" style={{ color: 'var(--c-text-2)', fontSize: '17px' }}>close</span>
            </button>

            {/* Circle background switches per theme via CSS var; multiply blend removes white bg in dark mode */}
            <div style={{
              width: '118px',
              height: '118px',
              borderRadius: '50%',
              background: 'var(--c-sprite-circle)',
              boxShadow: `0 0 40px ${accent}55, 0 0 0 1px ${accent}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}>
              <img
                src={pokemonDetails.image}
                alt={pokemonDetails.name}
                className="sprite-img"
                style={{ width: '104px', height: '104px', objectFit: 'contain' }}
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
                      background: `${ta}18`,
                      color: ta,
                      border: `1px solid ${ta}38`,
                      borderRadius: '999px',
                      padding: '4px 12px',
                      fontSize: '11px',
                      fontWeight: 600,
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

          {/* Stats — 2-column grid, no scroll */}
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

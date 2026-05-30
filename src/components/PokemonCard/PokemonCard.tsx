import React, { useState } from 'react';

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

type Props = {
  id: string;
  name: string;
  image: string;
  types: string[];
  number: number;
  animationDelay?: number;
};

export const PokemonCard: React.FC<Props> = ({ name, image, types, number, animationDelay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const primaryType = types[0]?.toLowerCase() ?? 'normal';
  const accent = TYPE_ACCENT[primaryType] ?? '#6E7680';

  return (
    <div
      className="card-in relative flex flex-col items-center pt-5 pb-4 px-3 cursor-pointer"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--c-rim-hover)' : 'var(--c-rim)'}`,
        borderRadius: '10px',
        boxShadow: hovered ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        animationDelay: `${animationDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sprite */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        {/* Type aura behind circle */}
        <div style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}28 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.15s ease',
        }} />
        {/* White circle container — multiply dissolves JPEG white bg */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 0.18s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}>
          <img
            src={image}
            alt={name}
            className="sprite-img"
            style={{ width: '66px', height: '66px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: '"Figtree", sans-serif',
          fontSize: '12.5px',
          fontWeight: 600,
          color: 'var(--c-text)',
          textTransform: 'capitalize',
          marginBottom: '5px',
          lineHeight: 1.2,
          textAlign: 'center',
        }}
      >
        {name}
      </h3>

      {/* Number · Types */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px',
            color: 'var(--c-text-3)',
            letterSpacing: '0.04em',
          }}
        >
          #{String(number).padStart(3, '0')}
        </span>

        {types.length > 0 && (
          <span style={{ color: 'var(--c-rim-hover)', fontSize: '9px', lineHeight: 1 }}>·</span>
        )}

        {types.map((t, i) => {
          const ta = TYPE_ACCENT[t.toLowerCase()] ?? '#6E7680';
          return (
            <React.Fragment key={t}>
              {i > 0 && <span style={{ color: 'var(--c-text-3)', fontSize: '9px' }}>·</span>}
              <span
                style={{
                  fontSize: '10px',
                  color: ta,
                  fontFamily: '"Figtree", sans-serif',
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;

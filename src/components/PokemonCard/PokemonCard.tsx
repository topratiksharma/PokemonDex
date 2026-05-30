import React, { useState } from 'react';

// Desaturated, muted type palette — intentionally subdued
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
  const accent = TYPE_ACCENT[primaryType] ?? '#7A8490';

  return (
    <div
      className="card-in relative flex flex-col items-center pt-4 pb-4 px-3 rounded-2xl cursor-pointer"
      style={{
        background: hovered ? 'var(--surface-2)' : 'var(--surface)',
        border: '1px solid var(--c-rim)',
        boxShadow: hovered
          ? '0 4px 20px rgba(0,0,0,0.10)'
          : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'background 0.18s ease, box-shadow 0.18s ease',
        animationDelay: `${animationDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sprite container */}
      <div
        style={{
          width: '84px',
          height: '84px',
          borderRadius: '10px',
          background: 'var(--c-sprite-circle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: 'transform 0.18s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        <img
          src={image}
          alt={name}
          className="sprite-img"
          style={{ width: '76px', height: '76px', objectFit: 'contain' }}
        />
      </div>

      {/* Name + number */}
      <div className="mt-3 text-center w-full">
        <h3
          className="text-[13px] capitalize mb-1 leading-tight"
          style={{ color: 'var(--c-text)', fontWeight: 500, fontFamily: '"Instrument Sans", sans-serif' }}
        >
          {name}
        </h3>

        <div className="flex justify-center items-center gap-1.5 flex-wrap">
          {/* Number */}
          <span
            className="text-[10px] tabular-nums"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--c-text-3)' }}
          >
            #{String(number).padStart(3, '0')}
          </span>

          {types.length > 0 && (
            <span style={{ color: 'var(--c-rim)', fontSize: '10px' }}>·</span>
          )}

          {/* Types */}
          {types.map((t, i) => {
            const ta = TYPE_ACCENT[t.toLowerCase()] ?? '#7A8490';
            return (
              <React.Fragment key={t}>
                {i > 0 && <span style={{ color: 'var(--c-rim)', fontSize: '10px' }}>·</span>}
                <span
                  className="text-[10px] font-medium"
                  style={{ color: ta, fontFamily: '"Instrument Sans", sans-serif' }}
                >
                  {t}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

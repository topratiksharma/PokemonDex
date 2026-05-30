import React, { useState } from 'react';

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
  const accent = TYPE_ACCENT[primaryType] ?? '#94A3B8';

  return (
    <div
      className="pokemon-card-appear relative flex flex-col items-center pt-3 pb-4 px-3 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hovered ? 'var(--c-surface-hov)' : 'var(--c-surface)',
        border: `1px solid ${hovered ? `${accent}35` : 'var(--c-rim)'}`,
        boxShadow: hovered
          ? `0 0 0 1px ${accent}18, 0 16px 48px rgba(0,0,0,0.28), 0 0 60px ${accent}0A`
          : '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.22s ease',
        animationDelay: `${animationDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sprite circle */}
      <div
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'var(--c-sprite-circle)',
          boxShadow: hovered ? `0 0 28px ${accent}55` : `0 0 12px ${accent}28`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          transform: hovered ? 'scale(1.07) translateY(-3px)' : 'scale(1)',
          transition: 'all 0.25s ease',
        }}
      >
        <img
          src={image}
          alt={name}
          className="sprite-img"
          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
        />
      </div>

      {/* Number */}
      <span
        className="absolute top-2.5 right-2.5 tabular-nums text-[10px] leading-none"
        style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--c-text-3)' }}
      >
        #{String(number).padStart(3, '0')}
      </span>

      {/* Name + types */}
      <div className="mt-2.5 text-center w-full relative z-10">
        <h3
          className="text-[13px] mb-1.5 capitalize"
          style={{ color: 'var(--c-text)', fontWeight: 600 }}
        >
          {name}
        </h3>
        <div className="flex justify-center gap-1 flex-wrap">
          {types.map((t) => {
            const ta = TYPE_ACCENT[t.toLowerCase()] ?? '#94A3B8';
            return (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold leading-none"
                style={{
                  background: `${ta}18`,
                  color: ta,
                  border: `1px solid ${ta}30`,
                }}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

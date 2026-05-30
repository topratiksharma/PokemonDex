import React from 'react';

const TYPE_BG: Record<string, string> = {
  bug:      'bg-[#F6D6A7]',
  dragon:   'bg-[#FBE3DF]',
  electric: 'bg-[#ffffa1]',
  fairy:    'bg-[#ffc0cb]',
  fighting: 'bg-[#a1a6f9]',
  fire:     'bg-[#FFC107]',
  ghost:    'bg-[#e8d5f5]',
  grass:    'bg-[#E2F9E1]',
  ground:   'bg-[#d4c5a9]',
  ice:      'bg-[#b3e8f0]',
  normal:   'bg-[#f0ede8]',
  poison:   'bg-[#eac6f7]',
  psychic:  'bg-[#CDDC39]',
  rock:     'bg-[#c49393]',
  water:    'bg-[#b4defb]',
  flying:   'bg-slate-200',
  steel:    'bg-slate-300',
  dark:     'bg-[#a08070]',
};

type Props = {
  id: string;
  name: string;
  image: string;
  types: string[];
  number: number;
};

export const PokemonCard: React.FC<Props> = ({ id, name, image, types, number }) => {
  const typeBg = TYPE_BG[types[0]?.toLowerCase()] ?? 'bg-white';

  return (
    <div
      className={`${typeBg} flex flex-col items-center justify-center m-[0.3rem] min-w-[160px] py-6 rounded-2xl border border-black/5 shadow-md text-center z-[1] hover:scale-[1.05] hover:shadow-xl transition-all duration-200`}
    >
      <span className="text-[#3e3232] text-[14px] font-bold self-end pr-2">
        {'#' + String(number).padStart(3, '0')}
      </span>
      <img
        src={image}
        alt={name}
        className="w-[120px] h-[120px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
      />
      <div className="flex flex-col w-full mt-1">
        <h3 className="mb-[0.2rem] text-black font-semibold">{name}</h3>
        <div className="flex justify-center gap-1 flex-wrap px-2">
          {types.map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold bg-black/25 text-black/90"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

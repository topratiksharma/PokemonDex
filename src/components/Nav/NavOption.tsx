import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavOptionProps {
  to: string;
  icon: string;
  name: string;
  children: React.ReactNode;
}

export const NavOption: React.FC<NavOptionProps> = ({ to, icon, name, children }) => {
  const base = 'w-full flex items-center box-border h-14 no-underline overflow-hidden bg-[#131924] hover:brightness-125 active:brightness-130 transition-all';
  const active = 'bg-[#171E2b] border-l-4 border-blue-400';

  return (
    <NavLink
      to={to}
      title={name}
      className={({ isActive }) => clsx(base, { [active]: isActive })}
    >
      <span className={clsx('material-icons flex items-center justify-center w-[45px] min-w-[45px] box-border')}>
        {icon}
      </span>
      <span className="ml-[18px] whitespace-nowrap">{children}</span>
    </NavLink>
  );
};

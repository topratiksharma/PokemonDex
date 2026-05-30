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
  return (
    <NavLink
      to={to}
      title={name}
      className={({ isActive }) =>
        clsx(
          'w-full flex items-center h-12 no-underline overflow-hidden mx-2 rounded-lg transition-all duration-150',
          isActive
            ? 'bg-white/10 border-l-[3px] border-blue-400 text-white'
            : 'text-white/60 hover:bg-white/[0.06] hover:text-white/90'
        )
      }
    >
      <span className="material-icons flex items-center justify-center w-[45px] min-w-[45px] text-[20px]">
        {icon}
      </span>
      <span className="ml-2 whitespace-nowrap text-sm font-medium">{children}</span>
    </NavLink>
  );
};

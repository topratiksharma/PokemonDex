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
      end={to === '/'}
      title={name}
      className="block w-full no-underline px-2 mb-0.5"
    >
      {({ isActive }) => (
        <div
          className={clsx(
            'flex items-center h-10 rounded-xl transition-all duration-150',
            isActive ? '' : 'hover:opacity-100'
          )}
          style={{
            background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
            borderLeft: isActive ? '2px solid rgba(255,255,255,0.6)' : '2px solid transparent',
          }}
          onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
        >
          <span
            className={clsx(
              'material-icons flex items-center justify-center w-[40px] min-w-[40px] text-[19px] transition-colors'
            )}
            style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)' }}
          >
            {icon}
          </span>
          <span
            className="ml-0.5 whitespace-nowrap text-[13px] font-semibold tracking-wide overflow-hidden"
            style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}
          >
            {children}
          </span>
        </div>
      )}
    </NavLink>
  );
};

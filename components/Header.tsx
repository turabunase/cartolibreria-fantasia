
import React from 'react';
import { NavLink } from 'react-router-dom';

const PencilIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const Header: React.FC = () => {
  const activeLinkClass = "text-pink-600 font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-400 after:rounded-full";
  const inactiveLinkClass = "text-gray-700 hover:text-pink-600 transition-colors duration-300 font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-pink-500/50 hover:after:to-yellow-400/50 hover:after:rounded-full";

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-gradient-to-r from-pink-500 to-yellow-500">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <NavLink to="/scuola" className="flex items-center space-x-3 group">
          <PencilIcon className="h-10 w-10 text-pink-500 group-hover:text-pink-600 transition-colors transform group-hover:rotate-12 duration-300" />
          <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 group-hover:from-pink-500 group-hover:to-yellow-400 transition-colors">Cartolibreria Fantasia</span>
        </NavLink>
        <ul className="flex items-center space-x-10 text-lg">
          <li>
            <NavLink
              to="/scuola"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              Scuola
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/oggettistica"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              Oggettistica
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/creazioni"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              Creazioni
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-yellow-600 transition-colors"
            >
              Area Admin
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // Adjust path as needed
import logoWhite from '../../assets/Images/Logo-White.svg'; // Adjust path as needed
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
function NormalLayout({ children }) {
  const { curTheme } = useTheme();

  const logoSrc = curTheme === 'dark' ? logoWhite : logoColor;

  return (
    <div id="Page">
      <div class="Masthead StickyTop !p-[40px]">
        <Link to="/Home">
          <img alt="Enoch AI" class="Logo" src={logoSrc} />
        </Link>
      </div>

      {children}
    </div>
  );
}

export default NormalLayout;

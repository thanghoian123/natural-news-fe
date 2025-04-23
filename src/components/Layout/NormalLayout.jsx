import React from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // Adjust path as needed

function NormalLayout({ children }) {
  return (
    <div id="Page">
      <div class="Masthead StickyTop">
        <a href="Home">
          <img alt="Enoch AI" class="Logo" src={logoColor} />
        </a>
      </div>

      {children}
    </div>
  );
}

export default NormalLayout;

import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';

const MenuButtons = ({ icon, text }) => {
  return (
    <button class="menuBtn">
      {icon}
      {text}
    </button>
  );
};

export default MenuButtons;

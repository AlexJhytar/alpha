import React from 'react';
import Link from "next/link";

const NavMenu = ( {obj} ) => {
  const menu = obj.map(( item ) => (
    <li key={item.menu}>
      <Link href={item.link}> {item.menu} </Link>
    </li>
  ))
  
  return (
    <ul>
      {menu}
    </ul>
  );
};

export default NavMenu;
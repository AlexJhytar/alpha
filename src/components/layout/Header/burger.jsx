"use client"
import React, { useEffect } from 'react';

const Burger = () => {
  const openMenu =() => {
    document.body.classList.toggle('mob-menu-open');
  }
  
  useEffect(() => {
    const menuLinks = document.querySelectorAll('.header a');
    menuLinks.forEach(item=> {
      item.addEventListener('click', ()=> {
        document.body.classList.remove('mob-menu-open');
      });
    });
  }, []);
  
  return (
    <div className="mob-menu" onClick={openMenu}><span/></div>
  );
};

export default Burger;
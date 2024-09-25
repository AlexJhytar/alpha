"use client";
import { useEffect, useState } from "react";

export default function CheckFixedHeader() {
  const [headerClassName, setHeaderClassName] = useState('');
  const handleScroll = (headerClassName) => {
    if (headerClassName !== 'fixed' && window.scrollY >= 200) {
      setHeaderClassName('fixed');
    }
    if (headerClassName === 'fixed' && window.scrollY <= 200) {
      setHeaderClassName('fixed static');
    }
    if (headerClassName === 'fixed static' && window.scrollY === 0) {
      setHeaderClassName('no-animation');
    }
  }
  
  useEffect(() => {
    window.onscroll = () => handleScroll(headerClassName);
    
    let header = document.querySelector('.header');
    if (header !== null) {
      header.className = `header ${headerClassName}`;
    }
  }, [headerClassName]);
  
}
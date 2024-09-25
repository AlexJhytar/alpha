"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Template( {children} ) {
  const [pageLoaded, usePageLoaded] = useState('0');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      usePageLoaded('1');
    }, 500);
    
    window.addEventListener("beforeunload", ()=> {
      usePageLoaded('0');
    })
  }, [usePageLoaded]);
  
  const anim = variants => {
    return {
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      variants
    }
  }
  
  const slideIn = {
    initial: {
      y: "-200px",
    },
    animate: {
      y: "0px",
    },
    exit: {
      y: "0px"
    }
  }
  
  return (
    <>
      <motion.div
        className="page-wrap"
        transition={{duration: 1, type: 'easeIn'}}
        {...anim(slideIn)}
        style={{opacity: `${pageLoaded}`}}>
        {children}
      </motion.div>
    </>
  )
}
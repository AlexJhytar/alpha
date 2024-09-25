import { Roboto, Manrope } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "500"],
  style : "normal",
  display : "swap",
  preload : true,
  subsets : ["cyrillic", "latin"],
  variable: '--font-roboto',
});

export const manrope = Manrope({
  weight: ["800"],
  style : "normal",
  display : "swap",
  preload : true,
  subsets : ["cyrillic", "latin"],
  variable: '--font-manrope',
});
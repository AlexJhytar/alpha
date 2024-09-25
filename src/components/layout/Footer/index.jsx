import Link from "next/link";
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Footer() {
  const year = new Date().getFullYear();
  
  const t = await getTranslations('Menu');
  let language = await getLocale();
  let lang = language === 'en' ? '' : `/${language}`;
  
  return (
    <>
      <footer id="footer" className="footer">
        <div className="container">
       
        </div>
      </footer>
    </>
  )
};
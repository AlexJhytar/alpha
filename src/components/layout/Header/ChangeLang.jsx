"use client";
import { usePathname, useRouter } from "next/navigation";

export default function ChangeLang( {lang} ) {
  const router = useRouter();
  let pathname = usePathname();
  
  const switchLanguage = ( target ) => {
    const newLocale = target.dataset.lang;
    const currentPath = pathname.split('/');
    
    if (currentPath.length >= 2 && newLocale !== 'en') {
      currentPath[1] = `${newLocale}/${currentPath[1]}`;
    }
    else {
      currentPath[1] = newLocale;
    }
    
    const newPath = currentPath.join('/');
    router.push(newPath);
    router.refresh();
  }
  
  return (
    <div className="header__block-lang">
										    <span data-lang="ua" onClick={e => switchLanguage(e.target)}
                    className={lang === "ua" ? 'active' : ''}>UA</span>
      <span data-lang="en" onClick={e => switchLanguage(e.target)}
            className={lang === "en" ? 'active' : ''}>EN</span>
    </div>
  )
}
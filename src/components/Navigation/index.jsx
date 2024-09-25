
import { useTranslations } from "next-intl";
import NavMenu from "@/components/Navigation/NavMenu";

const Navigation = ( {lang} ) => {
  const t = useTranslations('Menu');
  
  const itemMenu = [
    {link: `/${lang}/about`, menu: t('About')},
    {link: `/${lang}/contacts`, menu: t('Contacts')}
  ]
  
  return (
    <NavMenu obj={itemMenu} />
  );
};

export default Navigation;
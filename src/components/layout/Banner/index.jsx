import './banner.scss';
import BannerTitle from "./bannerTitle";
import BannerSubTitle from "./bannerSubTitle";
import { apiWP } from "@/api";
import { getLocale } from "next-intl/server";

export default async function Banner( slug ) {
  const lang = await getLocale();
  
  const idPage = await apiWP.getPages(slug).then(result => {
    return lang === 'en' ? result[0].translations.en : result[0].translations.ua
  });
  
  const blocks = () => getData(idPage).then(res => {
    return res.map(( item, key ) => {
      if (item.blockName === 'acf/blockbanner') {
        return (
          <div className="banner__wrap" key={key}>
            {BannerTitle(item.attrs.data.title)}
            {
              item.attrs.data.subtitle.length === 0 ? '' :
                <BannerSubTitle text={item.attrs.data.subtitle}/>
            }
          </div>
        )
      }
    })
    
  })
  
  return (
    <section className={`banner loaded`}>
      <div className="container">
        {await blocks()}
      </div>
    </section>
  )
  
};

async function getData( idPage ) {
  return await apiWP.getPage(idPage).then(res => res.block_data);
}
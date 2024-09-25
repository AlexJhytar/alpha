// import { apiWP } from "@/api";
// import { notFound } from 'next/navigation';
// import defaultPage from "@/app/[locale]/default";
//
// export default async function CatchAllPage({params}) {
//   const data = await getPages();
//   const slug = params.rest[0];
//
//   let links = [];
//   data.map(page => {
//     links.push(page.slug)
//   })
//
//   switch (links.includes(slug)) {
//     case false: {
//       return notFound();
//     }
//     default: {
//       return defaultPage(slug);
//     }
//   }
// }
//
// async function getPages() {
//   return await apiWP.link('/pages').then(result => result.data);
// }
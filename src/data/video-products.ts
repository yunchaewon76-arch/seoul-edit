/**
 * NO affiliate claims, prices or live stock without verification.
 * Evidence-based product list for specific reviewed videos is currently empty.
 * Add exact product-page links only after confirming the item in the original video.
 */
export type EditorialProduct = {
 id:string;
 videoSlug:string; // Video where the product was confirmed by listening/watching the original
 brand:string;name:string;
 variant?:string;imageUrl?:string; // use imagery only when allowed
 originalOrAlternative:"original"|"alternative";
 alternativeFor?:string;
 whyComparable?:string;
 russianRetailer?:string;
 russianProductUrl?:string; // exact verified product detail URL, not shop home/category
 checkedAt?:string; // yyyy-mm-dd
 comparisonSourceUrl?:string;
 verificationNote:string;
};
export const confirmedVideoProducts:EditorialProduct[]=[];
export const screenshotReferenceProducts = [
 {brand:"Swiss Perfection",name:"Urban Shield & Glow",note:"Название видно на присланном референсе. Участие в конкретном видео не подтверждено."},
 {brand:"Sulwhasoo",name:"UV Daily Tone Up Sunscreen",note:"Название видно на присланном референсе. Российский магазин, цена и наличие не проверены."}
] as const;
export function safeRetailerLink(product:EditorialProduct):string|null{
 if(!product.russianProductUrl || !product.checkedAt || !product.verificationNote.trim())return null;
 try{
  const url=new URL(product.russianProductUrl);
  if(url.protocol!=="https:" || !["goldapple.ru","www.goldapple.ru","ozon.ru","www.ozon.ru","wildberries.ru","www.wildberries.ru","rivegauche.ru","www.rivegauche.ru"].includes(url.hostname))return null;
  if(url.pathname.length<5 || ["/search","/catalog","/brands"].includes(url.pathname))return null;
  const date=Date.parse(product.checkedAt+"T00:00:00Z");
  const age=(Date.now()-date)/86400000;
  if(!Number.isFinite(date)||age<0||age>14)return null;
  if(product.originalOrAlternative==="alternative" && (!product.alternativeFor||!product.whyComparable||!product.comparisonSourceUrl))return null;
  return url.toString();
 }catch{return null;}
}

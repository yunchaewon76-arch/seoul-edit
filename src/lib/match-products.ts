import type {Budget,MatchPreferences} from "@/lib/match-options";
import {verifiedMarketProducts,type VerifiedMarketProduct} from "@/data/match-products";
/** Fail-closed verification rules: do not imply real-time stock. */
export const VERIFICATION_WINDOW_DAYS=7;
export function isFreshCheck(date:string,now:Date=new Date()):boolean{
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;
 const time=Date.parse(date+"T00:00:00Z");
 if(!Number.isFinite(time)||new Date(time).toISOString().slice(0,10)!==date)return false;
 const age=(now.getTime()-time)/86400000;
 return age>=0&&age<=VERIFICATION_WINDOW_DAYS;
}
export function isGoldAppleProductUrl(urlString:string):boolean{
 try{
  const u=new URL(urlString);
  return u.protocol==="https:"&&(u.hostname==="goldapple.ru"||u.hostname==="www.goldapple.ru")&&
   u.pathname.length>1&&!["/search","/catalog","/"].includes(u.pathname);
 }catch{return false;}
}
export function matchesBudget(price:number,budget:Budget):boolean{
 if(!Number.isFinite(price)||price<=0)return false;
 if(budget==="under1000")return price<1000;
 if(budget==="1000to3000")return price>=1000&&price<=3000;
 return price>3000;
}
export function isVerifiedFor(product:VerifiedMarketProduct,prefs:MatchPreferences,now:Date=new Date()):boolean{
 if(prefs.city==="other"||product.checkedCity!==prefs.city||!product.published)return false;
 if(!product.concerns.includes(prefs.concern)||!matchesBudget(product.priceRub,prefs.budget))return false;
 if(!isGoldAppleProductUrl(product.goldenAppleUrl))return false;
 if(!isFreshCheck(product.productPageCheckedAt,now)||!isFreshCheck(product.priceCheckedAt,now))return false;
 if(!product.sourceUrl.startsWith("https://")||!product.editorialReason.trim())return false;
 if(product.kind==="alternative"&&(!product.originalProductName?.trim()||!product.differenceNote?.trim()))return false;
 return true;
}
export const findVerifiedProducts=(prefs:MatchPreferences,now:Date=new Date())=>
 verifiedMarketProducts.filter(product=>isVerifiedFor(product,prefs,now));

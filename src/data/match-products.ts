import type {Concern,MatchCity} from "@/lib/match-options";
/** Manually checked listings only. See docs/SEOUL_MATCH_MVP.md. */
export type VerifiedMarketProduct = {
 id:string;
 brand:string;
 name:string;
 kind:"original"|"alternative";
 concerns:Concern[];
 priceRub:number;
 goldenAppleUrl:string;
 checkedCity:Exclude<MatchCity,"other">;
 productPageCheckedAt:string; // YYYY-MM-DD
 priceCheckedAt:string; // YYYY-MM-DD; checked for selected city
 published:true;
 editorialReason:string;
 originalProductName?:string;
 differenceNote?:string;
 sourceUrl:string;
};
/** Intentionally empty: NO Golden Apple product, price or local stock was verified. */
export const verifiedMarketProducts: VerifiedMarketProduct[]=[];

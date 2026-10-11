import mentions from "@/data/product-mentions.json";
export type CandidateProduct={
 videoSlug:string;brand:string;name:string;variant:string|null;sourceUrl:string;
 sourceType:"third_party_catalog";verificationStatus:"needs_original_check";
 russianProductUrl:string|null;checkedAt:string|null;priceRub:number|null;
};
export const productMentions:CandidateProduct[]=mentions as CandidateProduct[];
export const candidateProductsFor=(videoSlug:string)=>
 productMentions.filter(p=>p.videoSlug===videoSlug&&p.verificationStatus==="needs_original_check");

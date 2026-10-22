import type {EditorialProduct} from "./video-products";
export type ProductImage={src:string;alt:string;credit:string;kind:"licensed"|"editorial"|"fallback"};
const sanityImage=(url?:string)=>Boolean(url&&/^https:\/\/cdn\.sanity\.io\/images\/[a-z0-9_-]+\/[a-z0-9_-]+\//i.test(url));
const localArtwork=(url?:string)=>Boolean(url&&/^\/products\/editorial\/[a-z0-9_-]+\.svg$/i.test(url));
function categoryOf(p:EditorialProduct):NonNullable<EditorialProduct["productCategory"]>{
 if(p.productCategory&&["skincare","cheek","complexion","eyes","lips","tools"].includes(p.productCategory))return p.productCategory;
 const t=(p.name+" "+(p.variant||"")).toLowerCase();
 if(/brush|puff|applicator/.test(t))return "tools";
 if(/lip|gloss|rouge/.test(t))return "lips";
 if(/cheek|blush|highlighter|sherbet/.test(t))return "cheek";
 if(/mascara|eyeliner|eye |under liner|frottage|cream pencil|smudging/.test(t))return "eyes";
 if(/cushion|concealer|powder|foundation/.test(t))return "complexion";
 return "skincare";
}
export function getProductImage(p:EditorialProduct):ProductImage{
 const name=[p.brand,p.name,p.variant].filter(Boolean).join(" ");
 // Never render an unlicensed user-provided image. Use both attribution and permission proof.
 if(p.imageRightsConfirmed===true&&p.imageUsageBasis?.trim()&&p.imageCredit?.trim()&&sanityImage(p.imageUrl))
  return {src:p.imageUrl!,alt:p.imageAlt?.trim()||name,credit:p.imageCredit!,kind:"licensed"};
 if(sanityImage(p.editorialImageUrl))
  return {src:p.editorialImageUrl!,alt:p.editorialImageAlt?.trim()||"Иллюстрация SEOUL EDIT: "+name,credit:"Иллюстрация SEOUL EDIT",kind:"editorial"};
 if(localArtwork(p.editorialImagePath))
  return {src:p.editorialImagePath!,alt:p.editorialImageAlt?.trim()||"Иллюстрация SEOUL EDIT: "+name,credit:"Иллюстрация SEOUL EDIT",kind:"editorial"};
 const category=categoryOf(p);
 return {src:"/products/fallback/"+category+".svg",alt:"Иллюстрация категории "+category+": визуал для "+name+" ещё не подготовлен",credit:"Иллюстрация категории · требуется изображение товара",kind:"fallback"};
}

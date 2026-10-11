import "server-only";
import {cmsClient} from "@/sanity/client";
import {stories as seedArticles,type Article,type Category} from "@/data/articles";
import {videoStories as seedVideos,type VideoStory,type VideoCategory} from "@/data/video-stories";
import {confirmedVideoProducts,type EditorialProduct,safeRetailerLink} from "@/data/video-products";

const articleQuery='*[_type=="editorialArticle" && editorialStatus=="published" && defined(slug.current)]|order(publishedAt desc){"slug":slug.current,title,excerpt,category,format,"date":publishedAt,tags,"body":bodyParagraphs,signal,context,caution,readingMinutes,"coverImageUrl":coverImage.asset->url,"coverImageAlt":coverImage.alt,"coverImageCredit":coverImage.credit,sources[]{title,url,kind}}';
const videoQuery='*[_type=="creatorVideo" && editorialStatus=="published" && defined(slug.current)]|order(publishedAt desc){"slug":slug.current,youtubeId,headline,originalTitle,creator,category,reviewStatus,publishedAt,deck,takeaways,sourceNote,sourceUrl,linkedProducts}';
const productQuery='*[_type=="videoProduct" && editorialStatus=="published" && defined(video->slug.current)]{"id":_id,"videoSlug":video->slug.current,brand,name,variant,originalOrAlternative,alternativeFor,whyComparable,russianRetailer,russianProductUrl,checkedAt,comparisonSourceUrl,verificationNote,"imageUrl":image.asset->url}';

type SanityArticle=Partial<Article>&{slug?:string;coverImageUrl?:string;coverImageAlt?:string;coverImageCredit?:string};
async function load<T>(query:string):Promise<T[]>{
 if(!cmsClient)return [];
 try{return await cmsClient.fetch<T[]>(query,{}, {next:{revalidate:60}});}
 catch(error){console.error("Sanity query unavailable",error instanceof Error?error.message:"unknown");return [];}
}
function normalizeArticle(raw:SanityArticle):Article|null{
 if(!raw.slug||!raw.title||!raw.excerpt||!raw.signal||!raw.context||!raw.caution)return null;
 if(raw.category!=="beauty"&&raw.category!=="fashion"&&raw.category!=="trends")return null;
 const sources=(raw.sources||[]).filter(s=>s.title&&typeof s.url==="string"&&s.url.startsWith("https://"));
 if(!sources.length||!Array.isArray(raw.body)||!raw.body.length)return null;
 const date=typeof raw.date==="string"?raw.date.slice(0,10):"";
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return null;
 return {slug:raw.slug,title:raw.title,excerpt:raw.excerpt,category:raw.category as Category,
  format:raw.format==="brief"?"brief":"editorial",date,cover:"cms",tags:Array.isArray(raw.tags)?raw.tags:[],
  body:raw.body.filter(x=>typeof x==="string"&&x.trim()),signal:raw.signal,context:raw.context,
  caution:raw.caution,readingMinutes:typeof raw.readingMinutes==="number"?raw.readingMinutes:4,
  sources,coverImageUrl:raw.coverImageUrl?.startsWith("https://")?raw.coverImageUrl:undefined,
  coverImageAlt:raw.coverImageAlt||"Редакционное изображение",coverImageCredit:raw.coverImageCredit||"SEOUL EDIT"};
}
function normalizeVideo(raw:VideoStory):VideoStory|null{
 if(!raw.slug||!raw.headline||!/^[a-zA-Z0-9_-]{11}$/.test(raw.youtubeId))return null;
 return {...raw,category:raw.reviewStatus==="identified"&&["beauty","fashion","trends"].includes(raw.category||"")?raw.category as VideoCategory:null,
  creator:raw.creator||null,originalTitle:raw.originalTitle||null,publishedAt:raw.publishedAt||null,
  sourceUrl:raw.sourceUrl||null,linkedProducts:Array.isArray(raw.linkedProducts)?raw.linkedProducts:[],
  takeaways:Array.isArray(raw.takeaways)?raw.takeaways.filter(x=>typeof x==="string"):[]};
}
export async function getAllArticles():Promise<Article[]>{
 const raw=await load<SanityArticle>(articleQuery);
 const cms=raw.map(normalizeArticle).filter((s):s is Article=>s!==null);
 const used=new Set(cms.map(s=>s.slug));
 return [...cms,...seedArticles.filter(s=>!used.has(s.slug))].sort((a,b)=>b.date.localeCompare(a.date));
}
export async function getAllCreatorVideos():Promise<VideoStory[]>{
 const raw=await load<VideoStory>(videoQuery);
 const cms=raw.map(normalizeVideo).filter((s):s is VideoStory=>s!==null);
 const used=new Set(cms.map(s=>s.slug));
 return [...cms,...seedVideos.filter(s=>!used.has(s.slug))];
}
export async function getVerifiedProducts(videoSlug:string):Promise<EditorialProduct[]>{
 const raw=await load<EditorialProduct>(productQuery);
 const cms=raw.filter(p=>p.videoSlug===videoSlug&&p.id&&p.brand&&p.name&&p.verificationNote?.trim()&&safeRetailerLink(p));
 const used=new Set(cms.map(p=>p.id));
 return [...cms,...confirmedVideoProducts.filter(p=>p.videoSlug===videoSlug&&!used.has(p.id)&&safeRetailerLink(p))];
}

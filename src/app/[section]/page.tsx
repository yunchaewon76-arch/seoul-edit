import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import CreatorWatchSection from "@/components/CreatorWatchSection";
import {sortedStories,categoryName,type Category} from "@/data/articles";
const sections={
 beauty:{label:"Красота",title:"Beauty, но с контекстом",note:"Бьюти-инновации, ингредиенты, корейские рейтинги и научные объяснения."},
 fashion:{label:"Мода",title:"Новый взгляд на Сеул",note:"Недели моды, независимые дизайнеры и стиль без стереотипов."},
 trends:{label:"Тренды",title:"Меньше шума. Больше смысла.",note:"Отделяем действительно проверенные сигналы от громких заголовков."}
} as const;
export function generateStaticParams(){return Object.keys(sections).map(section=>({section}));}
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{
 const {section}=await params;return {title:section in sections?sections[section as Category].label:"Страница не найдена"};
}
export default async function SectionPage({params}:{params:Promise<{section:string}>}){
 const {section}=await params;if(!(section in sections))notFound();
 const details=sections[section as Category];const items=sortedStories.filter(s=>s.category===section);
 return <div className="container listing editorial-listing">
  <div className="eyebrow">SEOUL EDIT / {categoryName(section as Category).toUpperCase()}</div>
  <h1>{details.title}</h1><p className="intro">{details.note}</p>
  <p className="editorial-listing-note">{items.length} авторских материалов · ссылки на первоисточники в каждой публикации</p>
  <div className="story-grid">{items.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
  <CreatorWatchSection category={section as Category}/>

  <div className="editorial-bottom-link"><Link href="/signal">Как мы исследуем тренды ↗</Link></div>
 </div>;
}

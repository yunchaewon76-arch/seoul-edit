import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import VideoStoryCard from "@/components/VideoStoryCard";
import {getAllArticles,getAllCreatorVideos} from "@/sanity/content";
import {categoryName,type Category} from "@/data/articles";
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
 const details=sections[section as Category];const [articles,videos]=await Promise.all([getAllArticles(),getAllCreatorVideos()]);const items=articles.filter(s=>s.category===section);
 const sectionVideos=videos.filter(v=>v.category===section&&v.reviewStatus==="identified");
 return <div className="container listing editorial-listing">
  <div className="eyebrow">SEOUL EDIT / {categoryName(section as Category).toUpperCase()}</div>
  <h1>{details.title}</h1><p className="intro">{details.note}</p>
  <p className="editorial-listing-note">{items.length} авторских материалов · ссылки на первоисточники в каждой публикации</p>
  <div className="story-grid">{items.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
  {<section className="se-section-video"><div className="section-heading"><div><span className="section-num">CREATOR WATCH / ORIGINAL VIDEO</span><h2>Смотреть <em>и понимать</em></h2></div><Link className="section-action" href={"/video?category="+section}>Все видео ↗</Link></div><div className="se-video-grid">{sectionVideos.length?sectionVideos.map(s=><VideoStoryCard key={s.slug} story={s}/>):<p className="se-video-category-empty">Пока нет проверенных видео в этой теме. Новые ролики появятся после редакционной проверки.</p>}</div></section>}

  <div className="editorial-bottom-link"><Link href="/signal">Как мы исследуем тренды ↗</Link></div>
 </div>;
}

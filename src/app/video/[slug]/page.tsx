import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import VideoProductShelf from "@/components/VideoProductShelf";
import CandidateProductShelf from "@/components/CandidateProductShelf";
import {videoStories,videoYouTubeUrl} from "@/data/video-stories";
import {getAllCreatorVideos,getVerifiedProducts} from "@/sanity/content";

export function generateStaticParams(){return videoStories.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const story=(await getAllCreatorVideos()).find(s=>s.slug===slug);
 return story?{title:story.headline,description:story.deck}:{title:"Видео не найдено"};
}
export default async function VideoDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const story=(await getAllCreatorVideos()).find(s=>s.slug===slug);
 if(!story)notFound();
 const products=await getVerifiedProducts(story.slug);
 return <div className="container se-video-detail">
  <nav className="se-video-breadcrumb"><Link href="/video">← CREATOR WATCH</Link><span>/</span><span>VIDEO NOTE</span></nav>
  <div className="se-video-detail-header"><span className="eyebrow">SEOUL EDIT / KOREAN CREATOR WATCH</span>
   <h1>{story.headline}</h1><p>{story.deck}</p>
   <div className="se-video-author"><span>{story.creator||"Автор не подтверждён"}</span><span>{story.publishedAt||"Дата не подтверждена"}</span><span>{story.reviewStatus==="identified"?"Частично проверено":"Ожидает проверки"}</span></div>
  </div>
  <figure className="se-feature-video"><VideoPlayer id={story.youtubeId} title={story.headline}/><figcaption>Источник: YouTube · Официальное видео автора. Мы не загружаем видеозапись на сервер SEOUL EDIT.</figcaption></figure>
  <div className="se-video-editorial">
   <div className="se-video-sidebar"><span>EDITORIAL NOTES</span><strong>Watch.<br/>Understand.<br/>Verify.</strong></div>
   <div className="se-video-copy">
    <span className="eyebrow">{story.reviewStatus==="identified"?"ЧТО УСТАНОВЛЕНО ПО ДОСТУПНЫМ ИСТОЧНИКАМ":"РЕДАКЦИОННАЯ ПРОВЕРКА В ПРОЦЕССЕ"}</span>
    {story.takeaways.length?story.takeaways.map((p,i)=><p key={i}>{p}</p>):<p>У нас пока недостаточно подтверждённых данных, чтобы пересказать содержание этого видео. Мы сохраняем ссылку на оригинал и не придумываем ни тему, ни товары, ни советы автора.</p>}
    <div className="se-proof-note"><strong>Границы проверки</strong><p>{story.sourceNote}</p>
     <a href={videoYouTubeUrl(story.youtubeId)} target="_blank" rel="noopener noreferrer">Смотреть исходный ролик ↗</a>
     {story.sourceUrl&&<p><a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">Источник проверки метаданных ↗</a></p>}
    </div>
   </div>
  </div>
  <CandidateProductShelf videoSlug={story.slug}/>
  <VideoProductShelf products={products}/>
  <div className="se-video-back"><Link href="/video">← Другие видео в CREATOR WATCH</Link></div>
 </div>;
}

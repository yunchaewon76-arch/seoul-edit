import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getStory, sortedStories, stories, dateLabel, categoryName, formatName } from "@/data/articles";
import { photoFor } from "@/data/visuals";
export function generateStaticParams(){return stories.map(story=>({slug:story.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const story=getStory(slug);return story?{title:story.title,description:story.excerpt}:{title:"Статья не найдена"};
}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const story=getStory(slug);if(!story)notFound();
 const related=sortedStories.filter(s=>s.slug!==slug&&s.category===story.category).slice(0,3);
 const photo=photoFor(story);
 return <div className="container article-wrap">
  <Link className="back" href={"/"+story.category}>← {categoryName(story.category)}</Link>
  <div className="eyebrow">{categoryName(story.category)} / {formatName(story.format)} <span className="demo">ДЕМО</span></div>
  <h1>{story.title}</h1><p className="article-deck">{story.excerpt}</p>
  <div className="article-byline">Редакция SEOUL EDIT <span>·</span> {dateLabel(story.date)}</div>
  <figure className="article-photo">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={photo.src} alt={photo.alt}/>
   <figcaption>Фото: {photo.credit} · Иллюстративное изображение, не фотография описываемого продукта</figcaption>
  </figure>
  <div className="article-body"><aside className="notice"><b>Демонстрационный материал.</b> Текст создан для проверки дизайна. Это не новая проверенная информация и не рекомендация продукта.</aside>
   {story.body.map((para,i)=><p key={i}>{para}</p>)}
   <div className="tags">{story.tags.map(t=><span key={t}>#{t.replaceAll(" ","_")}</span>)}</div>
  </div>
  <section className="section-heading article-related"><div><span className="section-num">MORE TO READ</span><h2>Читайте <em>также</em></h2></div></section><div className="story-grid">{related.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
 </div>;
}

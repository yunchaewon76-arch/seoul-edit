import type { Metadata } from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import {getStory,sortedStories,stories,dateLabel,categoryName,formatName} from "@/data/articles";
import {photoFor} from "@/data/visuals";
export function generateStaticParams(){return stories.map(story=>({slug:story.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const story=getStory(slug);return story?{title:story.title,description:story.excerpt}:{title:"Статья не найдена"};
}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const story=getStory(slug);if(!story)notFound();
 const related=sortedStories.filter(s=>s.slug!==slug&&s.category===story.category).slice(0,3);
 const photo=photoFor(story);
 return <div className="container article-wrap signal-article">
  <Link className="back" href={"/"+story.category}>← {categoryName(story.category)}</Link>
  <div className="eyebrow">SEOUL SIGNAL / {categoryName(story.category)} / {formatName(story.format)}</div>
  <h1>{story.title}</h1><p className="article-deck">{story.excerpt}</p>
  <div className="article-byline">РЕДАКЦИЯ SEOUL EDIT <span>·</span> {dateLabel(story.date)} <span>·</span> {story.readingMinutes} МИН ЧТЕНИЯ</div>
  <figure className="article-photo">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={photo.src} alt={photo.alt}/>
   <figcaption>Фото: {photo.credit}. Изображение не подтверждает события, упомянутые в статье.</figcaption>
  </figure>
  <div className="signal-article-grid">
   <aside className="signal-rail"><span>SEOUL SIGNAL</span><strong>Факты.<br/>Контекст.<br/>Без шума.</strong><Link href="/signal">Все сигналы ↗</Link></aside>
   <div className="article-body">
    <div className="signal-evidence">
     <span className="signal-evidence-label">01 / ЧТО МЫ ПРОВЕРИЛИ</span>
     <p>{story.signal}</p>
     <span className="signal-evidence-label">02 / ПОЧЕМУ ЭТО ВАЖНО</span>
     <p>{story.context}</p>
    </div>
    {story.body.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
    <div className="signal-caution"><strong>ГРАНИЦЫ ВЫВОДОВ</strong><p>{story.caution}</p></div>
    <section className="signal-sources" aria-labelledby="sources-heading">
     <span className="signal-evidence-label">SOURCE CHECK / ОТКРЫТЫЕ ДАННЫЕ</span>
     <h2 id="sources-heading">Проверить первоисточники</h2>
     <p>Ниже материалы, использованные редакцией. Тексты написаны специально для SEOUL EDIT; изображения иллюстративные.</p>
     <ol>{story.sources.map((s,i)=><li key={i}>
      <span>{s.kind}</span>
      <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a>
     </li>)}</ol>
     <small>Материал подготовлен: {dateLabel(story.date)}. Информация может изменяться; источники открываются на сторонних сайтах.</small>
    </section>
    <div className="tags">{story.tags.map(tag=><span key={tag}>#{tag.replaceAll(" ","_")}</span>)}</div>
   </div>
  </div>
  <section className="section-heading article-related"><div><span className="section-num">KEEP EXPLORING</span><h2>Читайте <em>также</em></h2></div></section>
  <div className="story-grid">{related.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
 </div>;
}

import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { sortedStories } from "@/data/articles";
export const metadata:Metadata={title:"Поиск"};
export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){
 const {q=""}=await searchParams;const keyword=q.trim().toLocaleLowerCase("ru-RU");
 const filtered=keyword?sortedStories.filter(s=>[s.title,s.excerpt,...s.tags,...s.body].join(" ").toLocaleLowerCase("ru-RU").includes(keyword)):[];
 return <div className="container listing"><div className="eyebrow">SEOUL EDIT / SEARCH</div><h1>Поиск по журналу</h1>
  <form action="/search" className="search-form"><input name="q" aria-label="Что ищем?" placeholder="Например, уход или стиль" defaultValue={q} autoFocus/><button type="submit">Найти ↗</button></form>
  {keyword?<><p className="intro">Найдено: {filtered.length}</p><div className="story-grid">{filtered.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>{!filtered.length&&<p>Попробуйте другой запрос.</p>}</>:<p className="intro">Введите интересующую тему, продукт или стиль.</p>}
 </div>;
}

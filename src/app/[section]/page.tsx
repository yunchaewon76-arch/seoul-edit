import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { sortedStories } from "@/data/articles";
const sections={beauty:{label:"Красота",title:"Красота по-корейски",note:"Уход, косметика и практичные объяснения."},fashion:{label:"Мода",title:"Сеульский гардероб",note:"Идеи, стили и сочетания на каждый день."},trends:{label:"Тренды",title:"Коротко о главном",note:"Быстрые заметки, которые удобно читать каждый день."}} as const;
type Section=keyof typeof sections;
export function generateStaticParams(){return Object.keys(sections).map(section=>({section}));}
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{
 const {section}=await params;return {title:section in sections?sections[section as Section].label:"Страница не найдена"};
}
export default async function SectionPage({params}:{params:Promise<{section:string}>}){
 const {section}=await params; if(!(section in sections))notFound(); const details=sections[section as Section];
 const filtered=sortedStories.filter(s=>section==="trends"?s.format==="brief":s.category===section);
 return <div className="container listing"><div className="eyebrow">SEOUL EDIT / {details.label.toUpperCase()}</div><h1>{details.title}</h1><p className="intro">{details.note}</p><div className="story-grid">{filtered.map(s=><ArticleCard key={s.slug} story={s}/>)}</div></div>;
}

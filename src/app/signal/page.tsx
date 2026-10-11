import type {Metadata} from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import type {Category} from "@/data/articles";
import {getAllArticles} from "@/sanity/content";
export const metadata:Metadata={title:"SEOUL SIGNAL — контекст корейских трендов",description:"Источники, проверенные факты и культурный контекст K-beauty и моды Сеула."};
export default async function SignalPage({searchParams}:{searchParams:Promise<{topic?:string}>}){
 const {topic}=await searchParams;
 const sortedStories=await getAllArticles();
 const active=topic==="beauty"||topic==="fashion"||topic==="trends"?topic:"all";
 const items=active==="all"?sortedStories:sortedStories.filter(s=>s.category===active);
 const topics:{id:"all"|Category;name:string}[]=[{id:"all",name:"Все сигналы"},{id:"beauty",name:"Красота"},{id:"fashion",name:"Мода"},{id:"trends",name:"Тренды"}];
 return <div className="container signal-index">
   <header className="signal-index-hero"><span className="eyebrow">THE RESEARCH DESK / EST. 2026</span>
    <h1>SEOUL <em>SIGNAL.</em></h1>
    <p>Что действительно происходит в Корее? Мы изучаем официальные источники, корейские рейтинги, исследования и отраслевые репортажи — и объясняем их на русском.</p>
    <div className="signal-index-meta"><span>{sortedStories.length} EDITORIAL STORIES</span><span>FIRST EDITION / OCT 2026</span><span>FACTS BEFORE HYPE</span></div>
   </header>
   <nav className="signal-filters" aria-label="Фильтр материалов">
    {topics.map(t=><Link key={t.id} className={active===t.id?"active":""} href={t.id==="all"?"/signal":"/signal?topic="+t.id} aria-current={active===t.id?"page":undefined}>{t.name}</Link>)}
   </nav>
   <div className="signal-index-count">{items.length} материалов · ссылки на первоисточники в каждой статье</div>
   <div className="story-grid">{items.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
   <section className="signal-methodology"><span className="eyebrow">HOW WE WORK</span><h2>Наш метод — <em>показать источник.</em></h2>
    <div className="signal-methodology-grid">
     <div><span>01</span><strong>Найти первоисточник</strong><p>Начинаем с официальных корейских платформ, государственных публикаций или оригинальных исследований.</p></div>
     <div><span>02</span><strong>Отделить наблюдение от вывода</strong><p>Рейтинг магазина — не голосование всей страны; фото с недели моды — не социологическое исследование.</p></div>
     <div><span>03</span><strong>Объяснить контекст</strong><p>Рассказываем, что важно понять русскоязычному читателю, не подменяя факты рекламой.</p></div>
    </div>
   </section>
 </div>;
}

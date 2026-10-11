import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { sortedStories } from "@/data/articles";
export default function Home() {
 const hero=sortedStories.find(s=>s.format==="editorial")!;
 return <div className="container">
  <div className="masthead"><span>THE KOREAN EDIT</span><span>BEAUTY · FASHION · CULTURE</span></div>
  <section className="hero">
    <div className="hero-copy"><div className="eyebrow">KOREAN BEAUTY & FASHION / DEMO</div><h1>Корейские тренды,<br/><em>которые стоит знать.</em></h1><p>Коротко о главном и подробно о важном: свежий взгляд на K-beauty и стиль Сеула.</p><Link className="cta" href={"/article/"+hero.slug}>Читать журнал <span>↗</span></Link></div>
    <div className="hero-visual" aria-hidden="true"><span>SEOUL</span><div className="hero-circle"/><strong>EDIT / 01</strong></div>
  </section>
  <section className="section-head"><div><div className="eyebrow">01 / THE DAILY EDIT</div><h2>Коротко о трендах</h2></div><Link href="/trends">Все тренды ↗</Link></section>
  <div className="story-grid">{sortedStories.filter(s=>s.format==="brief").slice(0,3).map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
  <section className="section-head"><div><div className="eyebrow">02 / DEEP DIVE</div><h2>Большие истории</h2></div></section>
  <div className="story-grid">{sortedStories.filter(s=>s.format==="editorial").map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
  <section className="subscribe"><div className="eyebrow">BEAUTY × FASHION</div><h2>От Сеула — вашему экрану.</h2><p>Сейчас это демонстрационный сайт. Скоро здесь появятся проверенные материалы и ссылки на источники.</p></section>
 </div>;
}

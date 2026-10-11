import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { sortedStories, categoryName, dateLabel } from "@/data/articles";
import { photoFor } from "@/data/visuals";

export default function Home() {
 const cover=sortedStories.find(s=>s.slug==="k-beauty-simple-routine")!;
 const latest=sortedStories.slice(0,3);
 const briefs=sortedStories.filter(s=>s.format==="brief").slice(0,4);
 const beauty=sortedStories.find(s=>s.slug==="read-skincare-label")!;
 const fashion=sortedStories.find(s=>s.slug==="seoul-minimal-style")!;
 return <div id="top"><div className="container">
  <div className="issue-line"><span><span className="issue-mark">✳</span> ISSUE 001 <span className="issue-separator">/</span> OCTOBER 2026</span><span>КРАСОТА · МОДА · СЕУЛ</span><span className="issue-right">A NEW VIEW ON KOREA ↗</span></div>
  <section className="cover-story" aria-labelledby="cover-title">
   <Link href={"/article/"+cover.slug} className="cover-photo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={photoFor(cover).src} alt={photoFor(cover).alt} fetchPriority="high"/>
    <span className="cover-photo-label">THE BEAUTY ISSUE <span>01 / 08</span></span>
    <span className="cover-watermark" aria-hidden="true">S<span>E</span>OUL</span>
   </Link>
   <div className="cover-copy">
    <div className="cover-kicker"><span className="dot" /> BEAUTY / THE COVER STORY <span className="demo">ДЕМО</span></div>
    <div><p className="cover-issue">THE NEW BEAUTY PERSPECTIVE</p>
     <h1 id="cover-title">Корейский уход:<br/><em>искусство</em><br/>простоты.</h1>
     <p className="cover-desc">{cover.excerpt} Наш взгляд на уход, в котором меньше шагов, но больше смысла.</p>
     <Link href={"/article/"+cover.slug} className="text-link">Читать историю <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="cover-bottom"><span>SEOUL EDIT / NO. 001</span><span>PHOTO: UNSPLASH · DEMO</span></div>
   </div>
  </section>
  <div className="under-cover"><span>THE EDITED VIEW</span><p>Самое интересное из мира корейской красоты и моды — с контекстом, без информационного шума.</p><span>SCROLL TO DISCOVER ↓</span></div>
  <section className="match-promo" aria-label="SEOUL MATCH">
   <div><span className="match-promo-label">✳ INTRODUCING SEOUL MATCH</span>
    <h2>Корейские тренды. <em>Твой выбор.</em></h2>
    <p>Три вопроса о ваших интересах, бюджете и городе. Только проверенные ссылки — никаких придуманных остатков.</p>
   </div>
   <Link href="/match" className="match-button">Найти свой MATCH ↗</Link>
  </section>
  <section className="mag-section" aria-labelledby="latest-heading">
   <div className="section-heading"><div><span className="section-num">01 / THE LATEST</span><h2 id="latest-heading">Новые <em>истории</em></h2></div><Link className="section-action" href="/trends">Смотреть все материалы <span>↗</span></Link></div>
   <div className="story-grid">{latest.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
  </section>
 </div>
 <div className="statement-band"><div className="container statement-inner"><span>THE SEOUL POINT OF VIEW</span><strong>BEAUTY <i>is</i> CULTURE <b>✳</b> FASHION <i>is</i> PERSONAL.</strong><span>NO. 001 — INDEPENDENT EDIT</span></div></div>
 <div className="container">
  <section className="mag-section features-section" aria-labelledby="features-heading">
   <div className="section-heading"><div><span className="section-num">02 / IN FOCUS</span><h2 id="features-heading">В центре <em>внимания</em></h2></div><span className="section-subtitle">Две стороны современной Кореи</span></div>
   <div className="feature-grid">
    <Link className="feature-tile" href={"/article/"+beauty.slug}><div className="feature-img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={photoFor(beauty).src} alt={photoFor(beauty).alt} loading="lazy"/></div><div className="feature-line"><span>01 / BEAUTY <span className="demo">ДЕМО</span></span><span aria-hidden="true">↗</span></div><h3>{beauty.title}</h3><p>{beauty.excerpt}</p></Link>
    <Link className="feature-tile" href={"/article/"+fashion.slug}><div className="feature-img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={photoFor(fashion).src} alt={photoFor(fashion).alt} loading="lazy"/></div><div className="feature-line"><span>02 / FASHION <span className="demo">ДЕМО</span></span><span aria-hidden="true">↗</span></div><h3>{fashion.title}</h3><p>{fashion.excerpt}</p></Link>
   </div>
  </section>
  <section className="mag-section brief-section" aria-labelledby="brief-heading">
   <div className="section-heading"><div><span className="section-num">03 / THE QUICK READ</span><h2 id="brief-heading">За <em>минуту</em></h2></div><Link className="section-action" href="/trends">Все короткие обзоры <span>↗</span></Link></div>
   <div className="brief-layout">
    <div className="brief-intro"><span className="brief-star">✳</span><p>Коротко.<br/><em>Но по делу.</em></p><span>THE DAILY EDIT<br/>CURATED FOR YOU</span></div>
    <div className="brief-list">{briefs.map((s,i)=><Link href={"/article/"+s.slug} key={s.slug} className="brief-item"><span className="brief-number">0{i+1}</span><div><span className="brief-category">{categoryName(s.category)} <span className="demo">ДЕМО</span></span><h3>{s.title}</h3><small>{dateLabel(s.date)}</small></div><span className="brief-arrow" aria-hidden="true">↗</span></Link>)}</div>
   </div>
  </section>
  <section className="end-note"><span>SEOUL EDIT · AN INDEPENDENT TAKE ON KOREA</span><h2>From Seoul,<br/><em>with perspective.</em></h2><p>Пока это демонстрационный журнал: публикации служат примером оформления. Скоро здесь появятся проверенные тренды и материалы с источниками.</p><Link className="text-link" href="/beauty">Открыть журнал <span>↗</span></Link></section>
 </div></div>;
}

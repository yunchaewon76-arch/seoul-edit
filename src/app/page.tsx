import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import VideoStoryCard from "@/components/VideoStoryCard";
import {videoStories} from "@/data/video-stories";
import {sortedStories,categoryName} from "@/data/articles";
import {photoFor} from "@/data/visuals";

export default function Home(){
 const hero=sortedStories.find(s=>s.slug==="hwahae-2026-what-rankings-tell-us")!;
 const spotlight=sortedStories.find(s=>s.slug==="seoul-fashion-week-2027-city-festival")!;
 const picks=sortedStories.filter(s=>s.slug!==hero.slug&&s.slug!==spotlight.slug).slice(0,6);
 return <div id="top"><div className="container">
  <div className="issue-line"><span><span className="issue-mark">✳</span> ISSUE 001 <span className="issue-separator">/</span> OCTOBER 2026</span><span>BEAUTY · FASHION · SEOUL SIGNAL</span><span className="issue-right">INDEPENDENT KOREA JOURNAL ↗</span></div>
  <section className="cover-story" aria-labelledby="cover-title">
   <Link href={"/article/"+hero.slug} className="cover-photo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={photoFor(hero).src} alt={photoFor(hero).alt} fetchPriority="high"/>
    <span className="cover-photo-label">THE SIGNAL ISSUE <span>01 / 09</span></span>
    <span className="cover-watermark" aria-hidden="true">S<span>E</span>OUL</span>
   </Link>
   <div className="cover-copy">
    <div className="cover-kicker"><span className="dot"/> SEOUL SIGNAL / COVER STORY</div>
    <div><p className="cover-issue">NOT JUST TRENDS. THE CONTEXT.</p>
     <h1 id="cover-title">Не просто<br/><em>тренды.</em><br/>Настоящая Корея.</h1>
     <p className="cover-desc">Почему корейский бьюти-рейтинг не всегда означает «любимый продукт всей страны»? Разбираем источники, а не повторяем заголовки.</p>
     <Link href={"/article/"+hero.slug} className="text-link">Читать разбор <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="cover-bottom"><span>SEOUL EDIT / EDITORIAL NOTE</span><span>SOURCE-FIRST JOURNALISM</span></div>
   </div>
  </section>
  <div className="under-cover"><span>WHAT'S BEHIND THE TREND</span><p>Корейская красота и мода — с фактами, оригинальными источниками и вниманием к контексту.</p><span>READ WITH CURIOSITY ↓</span></div>
  <section className="signature-intro" aria-label="Что такое SEOUL SIGNAL">
   <div className="signature-index"><span>01 / OUR SIGNATURE FORMAT</span><strong>✳</strong></div>
   <div><span className="eyebrow">INTRODUCING SEOUL SIGNAL</span><h2>Тренд — это только <em>начало истории.</em></h2><p>Мы ищем, где и как зародилась идея, проверяем данные и объясняем, что стоит за заголовком. Без выдуманных «хитов Кореи» и навязчивого шопинга.</p><Link href="/signal" className="text-link">Исследовать сигналы <span>↗</span></Link></div>
  </section>
  <section className="se-home-video" aria-labelledby="se-home-video-heading">
    <div className="section-heading"><div><span className="section-num">02 / KOREAN CREATOR WATCH</span><h2 id="se-home-video-heading">Видео, <em>которые обсуждают</em></h2></div><Link className="section-action" href="/video">Все видео <span>↗</span></Link></div>
    <p className="se-home-video-deck">Смотрим корейские видео в оригинале, объясняем контекст на русском и проверяем, какие продукты действительно упоминаются.</p>
    <div className="se-video-grid">{videoStories.map(s=><VideoStoryCard key={s.slug} story={s}/>)}</div>
  </section>
  <section className="mag-section" aria-labelledby="latest-heading">
   <div className="section-heading"><div><span className="section-num">02 / THE RESEARCH DESK</span><h2 id="latest-heading">Важное <em>с контекстом</em></h2></div><Link className="section-action" href="/signal">Все материалы <span>↗</span></Link></div>
   <div className="story-grid">{picks.map(s=><ArticleCard key={s.slug} story={s}/>)}</div>
  </section>
 </div>
 <div className="statement-band"><div className="container statement-inner"><span>THE EDITORIAL PROMISE</span><strong>FACTS <i>before</i> HYPE <b>✳</b> CONTEXT <i>over</i> CLICKS.</strong><span>SEOUL EDIT / AN INDEPENDENT VIEW</span></div></div>
 <div className="container">
  <section className="mag-section editorial-highlight" aria-labelledby="highlight-heading">
   <div className="section-heading"><div><span className="section-num">03 / FROM SEOUL</span><h2 id="highlight-heading">Город <em>в движении</em></h2></div><Link className="section-action" href="/fashion">Вся мода <span>↗</span></Link></div>
   <div className="editorial-feature">
    <Link href={"/article/"+spotlight.slug} className="editorial-feature-img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photoFor(spotlight).src} alt={photoFor(spotlight).alt} loading="lazy"/>
      <span>FASHION REPORT / SEOUL ↗</span>
    </Link>
    <div className="editorial-feature-copy"><span className="eyebrow">FASHION · CITY CULTURE</span><h3>{spotlight.title}</h3><p>{spotlight.excerpt}</p><div className="editorial-feature-proof"><span>ПЕРВОИСТОЧНИК</span><strong>Seoul Metropolitan Government</strong></div><Link href={"/article/"+spotlight.slug} className="text-link">Читать историю <span>↗</span></Link></div>
   </div>
  </section>
  <section className="ask-teaser" aria-labelledby="ask-heading">
    <div><span className="eyebrow">04 / ASK SEOUL</span><h2 id="ask-heading">Вопросы, которые <em>стоит задать.</em></h2><p>Почему на корейских платформах и в зарубежных обзорах разные фавориты? Чему можно верить в рекламе PDRN? Как читать фото с Seoul Fashion Week? Исследуем вопросы вместо того, чтобы продавать ответы.</p><Link href="/ask" className="text-link">Открыть ASK SEOUL <span>↗</span></Link></div>
    <div className="ask-teaser-card"><span>YOU ASK / WE INVESTIGATE</span><strong>«Это действительно модно в Корее?»</strong><span>СМОТРИ ИСТОЧНИКИ · ЗАДАВАЙ ВОПРОСЫ · ИЩИ КОНТЕКСТ</span></div>
  </section>
  <section className="mag-section" aria-labelledby="explore-heading">
   <div className="section-heading"><div><span className="section-num">05 / YOUR NEXT READ</span><h2 id="explore-heading">Выбирайте <em>тему</em></h2></div></div>
   <div className="topic-grid">
    <Link href="/beauty"><span>01 / BEAUTY DECODED</span><strong>Красота</strong><p>Ингредиенты, исследования, местные рейтинги и понятные объяснения.</p><b>Читать ↗</b></Link>
    <Link href="/fashion"><span>02 / REAL SEOUL STYLE</span><strong>Мода</strong><p>Дизайнеры, городской стиль и культурный контекст.</p><b>Читать ↗</b></Link>
    <Link href="/trends"><span>03 / THE SIGNAL DESK</span><strong>Тренды</strong><p>Факты, источники и то, что ещё только предстоит проверить.</p><b>Читать ↗</b></Link>
   </div>
  </section>
  <section className="end-note"><span>SEOUL EDIT · THE KOREAN EDIT</span><h2>See beyond <em>the trend.</em></h2><p>Не просто новости из Кореи. Объяснение того, как они устроены — на русском языке, с первоисточниками и открытыми оговорками.</p><Link href="/signal" className="text-link">Наши исследования <span>↗</span></Link></section>
 </div></div>;
}

import type {Metadata} from "next";
import Link from "next/link";
import VideoStoryCard from "@/components/VideoStoryCard";
import VideoProductShelf from "@/components/VideoProductShelf";
import {videoStories} from "@/data/video-stories";
export const metadata:Metadata={title:"Korean Creator Watch — видео и контекст",description:"Корейские бьюти- и фэшн-видео: оригинальные ролики, независимые редакционные пояснения и проверяемые товарные заметки."};
export default function VideoPage(){
 return <div className="container se-video-page">
  <div className="se-video-mast"><span className="eyebrow">SEOUL EDIT / CREATOR WATCH</span>
   <h1>Смотрим <em>Корею.</em><br/>Понимаем <em>больше.</em></h1>
   <p>Бьюти- и фэшн-видео корейских авторов — с русскоязычным объяснением, ссылками на оригинал и прозрачной проверкой упомянутых продуктов.</p>
   <div className="se-mast-info"><span>ORIGINAL VIDEO FIRST</span><span>NO UNVERIFIED SHOPPING LINKS</span><span>EDITORIAL VIEW</span></div>
  </div>
  <section className="se-video-list" aria-label="Видео и статьи">
   <div className="section-heading"><div><span className="section-num">01 / THE VIDEO JOURNAL</span><h2>Из YouTube — <em>в контекст</em></h2></div></div>
   <div className="se-video-grid">{videoStories.map(s=><VideoStoryCard key={s.slug} story={s}/>)}</div>
  </section>
  <VideoProductShelf products={[]} showReference/>
  <section className="se-video-method"><span className="eyebrow">OUR EDITORIAL RULE</span><h2>Рассказать, <em>не додумывая.</em></h2>
   <p>Сначала мы проверяем автора, содержание видео и конкретное упоминание продукта. Только после этого появляется русскоязычный разбор, а затем ссылка на точную карточку товара в России — или обоснованная альтернатива. До проверки остаётся нейтральная пометка, а не вымышленная рекомендация.</p>
   <Link href="/signal">Как мы проверяем источники ↗</Link>
  </section>
 </div>;
}

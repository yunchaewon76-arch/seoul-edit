import type {Metadata} from "next";
import Link from "next/link";
import VideoStoryCard from "@/components/VideoStoryCard";
import VideoProductShelf from "@/components/VideoProductShelf";
import {getAllCreatorVideos} from "@/sanity/content";
import {videoCategoryLabels,type VideoCategory} from "@/data/video-stories";

export const metadata:Metadata={title:"CREATOR WATCH — корейские видео по темам",description:"Видео корейских авторов: Красота, Мода, Тренды, первоисточники и редакционный контекст."};
type Filter=VideoCategory|"all";
const tabs:{id:Filter;label:string}[]=[{id:"all",label:"Все видео"},{id:"beauty",label:"Красота"},{id:"fashion",label:"Мода"},{id:"trends",label:"Тренды"}];
export default async function VideoPage({searchParams}:{searchParams:Promise<{category?:string}>}){
 const {category}=await searchParams;
 const videos=await getAllCreatorVideos();
 const active:Filter=category==="beauty"||category==="fashion"||category==="trends"?category:"all";
 const visible=active==="all"?videos:videos.filter(v=>v.category===active&&v.reviewStatus==="identified");
 const count=(filter:Filter)=>filter==="all"?videos.length:videos.filter(v=>v.category===filter&&v.reviewStatus==="identified").length;
 return <div className="container se-video-page">
  <div className="se-video-mast"><span className="eyebrow">SEOUL EDIT / CREATOR WATCH</span>
   <h1>Смотрим <em>Корею.</em><br/>Понимаем <em>больше.</em></h1>
   <p>Видео корейских бьюти- и фэшн-авторов, собранные по темам. Оригиналы, контекст на русском и честная маркировка проверенных сведений.</p>
   <div className="se-mast-info"><span>ORIGINAL VIDEO FIRST</span><span>BEAUTY · FASHION · TRENDS</span><span>EDITORIAL VIEW</span></div>
  </div>
  <section className="se-video-list" aria-label="Видео и категории">
   <div className="section-heading"><div><span className="section-num">01 / THE VIDEO JOURNAL</span><h2>Выберите <em>тему</em></h2></div></div>
   <nav className="se-video-filters" aria-label="Категории видео">
    {tabs.map(tab=><Link className={"se-video-filter"+(tab.id===active?" is-selected":"")} aria-current={tab.id===active?"page":undefined}
      key={tab.id} href={tab.id==="all"?"/video":"/video?category="+tab.id}>
     <span>{tab.label}</span><small>{count(tab.id)}</small>
    </Link>)}
   </nav>
   <p className="se-video-filter-summary">{active==="all"?"Все видео":videoCategoryLabels[active]} · {visible.length} материалов. Непроверенные видео появляются только в общем каталоге.</p>
   {visible.length?<div className="se-video-grid">{visible.map(s=><VideoStoryCard key={s.slug} story={s}/>)}</div>:
    <div className="se-video-filter-empty"><span aria-hidden="true">✳</span><h3>В этой категории пока нет проверенных видео.</h3>
      <p>Мы не добавляем ролики без подтверждения автора и темы. Новые видео появятся после редакционной проверки.</p>
      <Link href="/video">Вернуться ко всем видео ↗</Link>
    </div>}
  </section>
  {active==="all"&&<VideoProductShelf products={[]} showReference/>}
  <section className="se-video-method"><span className="eyebrow">OUR EDITORIAL RULE</span><h2>Рассказать, <em>не додумывая.</em></h2>
   <p>Оригинальные материалы отделяются от неподтверждённых упоминаний. Покупные ссылки и альтернативы появляются только после проверки продукта и источника в России.</p>
   <Link href="/signal">Как мы проверяем источники ↗</Link>
  </section>
 </div>;
}

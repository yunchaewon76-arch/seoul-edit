import Link from "next/link";
import VideoStoryCard from "@/components/VideoStoryCard";
import {videoCategoryLabels,videosInCategory,type VideoCategory} from "@/data/video-stories";

export default function CreatorWatchSection({category}:{category:VideoCategory}){
 const videos=videosInCategory(category);
 return <section className="se-section-video" aria-labelledby={"creator-watch-"+category}>
  <div className="section-heading">
   <div><span className="section-num">CREATOR WATCH / {videoCategoryLabels[category].toUpperCase()}</span>
    <h2 id={"creator-watch-"+category}>Смотреть <em>и понимать</em></h2>
   </div>
   <Link className="section-action" href={"/video?category="+category}>Все видео по теме ↗</Link>
  </div>
  <p className="se-section-video-intro">
   Корейские YouTube-видео по теме «{videoCategoryLabels[category]}»: оригинал, русскоязычные пояснения и только проверенные сведения об упомянутых продуктах.
  </p>
  {videos.length>0?<div className="se-video-grid">{videos.map(story=><VideoStoryCard key={story.slug} story={story}/>)}</div>:
   <div className="se-section-video-empty">
    <div><span className="eyebrow">COMING SOON / EDITORIAL REVIEW</span>
     <h3>Видео по этой теме пока на проверке.</h3>
     <p>В этом разделе появятся ролики, для которых мы подтвердили автора, содержание и соответствие категории. А пока можно изучить общий каталог.</p>
    </div>
    <Link href="/video" className="se-section-video-link">Открыть CREATOR WATCH ↗</Link>
   </div>}
 </section>;
}

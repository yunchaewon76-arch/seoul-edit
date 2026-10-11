import Link from "next/link";
import {type VideoStory,videoThumbnail,videoCategoryLabels} from "@/data/video-stories";
export default function VideoStoryCard({story}:{story:VideoStory}){
 const status=story.reviewStatus==="identified"&&story.category?videoCategoryLabels[story.category]:"Тема на проверке";
 return <Link href={"/video/"+story.slug} className="se-video-card">
  <div className="se-video-cover">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={videoThumbnail(story.youtubeId)} alt={"Обложка YouTube-видео "+story.youtubeId} loading="lazy" />
   <span className="se-video-cover-play" aria-hidden="true">▶</span>
  </div>
  <div className="se-video-tags"><span>VIDEO JOURNAL / {status}</span><span>{story.reviewStatus==="identified"?"ИСТОЧНИК ИДЕНТИФИЦИРОВАН":"НА ПРОВЕРКЕ"}</span></div>
  <h3>{story.headline}</h3><p>{story.deck}</p><span className="se-video-open">Читать материал ↗</span>
 </Link>;
}

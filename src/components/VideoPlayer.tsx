"use client";
import {useState} from "react";
import {videoThumbnail,videoYouTubeUrl} from "@/data/video-stories";
export default function VideoPlayer({id,title}:{id:string;title:string}){
 const [play,setPlay]=useState(false);
 return <div className="se-video-player">
  {play?<iframe
    src={"https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1"}
    title={title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen referrerPolicy="strict-origin-when-cross-origin" loading="lazy" />:
  <button type="button" onClick={()=>setPlay(true)} className="se-video-activate" aria-label={"Воспроизвести видео: "+title}>
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={videoThumbnail(id)} alt={"Обложка YouTube: "+title} loading="lazy" />
   <span className="se-video-play" aria-hidden="true">▶</span>
   <span className="se-video-label">СМОТРЕТЬ ОРИГИНАЛЬНОЕ ВИДЕО</span>
  </button>}
  <a className="se-video-youtube" href={videoYouTubeUrl(id)} target="_blank" rel="noopener noreferrer">Открыть на YouTube ↗</a>
 </div>;
}

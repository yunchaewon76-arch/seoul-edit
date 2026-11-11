"use client";
import {useState} from "react";
export type SourcePhoto={src:string;caption:string;credit:string|null;rights:string};
export type SourceImageRecord={
 slug:string;publisher:string;http:number;status:string;images:SourcePhoto[];note?:string;error?:string
};
export default function SourceImageGallery({record,sourceUrl}:{record?:SourceImageRecord;sourceUrl:string}){
 const [broken,setBroken]=useState<string[]>([]);
 if(!record || !record.images?.length){
  return <section aria-label="Фотографии из корейского источника" className="se-source-gallery se-source-gallery--external">
   <p className="se-source-gallery__eyebrow">ФОТОГРАФИИ ИЗ ПЕРВОИСТОЧНИКА</p>
   <p>Посмотреть фотографии в оригинальном материале.</p>
   <a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow">Открыть корейский первоисточник ↗</a>
  </section>;
 }
 return <section aria-label="Фотографии из корейского источника" className="se-source-gallery">
   <div className="se-source-gallery__head"><p className="se-source-gallery__eyebrow">СНИМКИ ИЗ ПЕРВОИСТОЧНИКА</p><a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow">Оригинальная публикация ↗</a></div>
   <div className="se-source-gallery__grid">
    {record.images.map((img,i)=><figure key={img.src} className="se-source-gallery__figure">
      {!broken.includes(img.src)?<a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow" title="Посмотреть оригинальную публикацию">
        {/* Source images are for protected editorial preview; rights remain uncleared. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.caption||"Иллюстрация из оригинальной публикации "+record.publisher} loading="lazy" onError={()=>setBroken(x=>[...x,img.src])}/>
       </a>:<a className="se-source-gallery__fallback" href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow">Посмотреть снимок у первоисточника ↗</a>}
      <figcaption>Фото: {img.credit||record.publisher} <span>·</span> <a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow">Источник: {record.publisher}</a></figcaption>
     </figure>)}
   </div>
  </section>;
}

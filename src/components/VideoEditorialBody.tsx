import type {VideoTakeaway} from "@/data/video-stories";

export default function VideoEditorialBody({items}:{items:VideoTakeaway[]}){
 if(!items.length){
  return <p>У нас пока недостаточно подтверждённых данных, чтобы пересказать содержание этого видео. Мы сохраняем ссылку на оригинал и не придумываем ни тему, ни товары, ни советы автора.</p>;
 }
 return <div className="se-video-rich-content">
  {items.map((item,index)=>typeof item==="string"?
   <p key={"p-"+index}>{item}</p>:
   <figure className="se-editorial-figure" key={item._key||"img-"+index}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={item.url} alt={item.alt} loading="lazy"/>
    <figcaption>
     <span>{item.caption}</span>
     {item.credit&&<small>Фото: {item.credit}</small>}
    </figcaption>
   </figure>
  )}
 </div>;
}

import type {VideoTakeaway} from "@/data/video-stories";

export default function VideoEditorialBody({items}:{items:VideoTakeaway[]}){
 if(!items.length){
  return <p>У нас пока недостаточно подтверждённых данных, чтобы пересказать содержание этого видео. Мы сохраняем ссылку на оригинал и не придумываем ни тему, ни товары, ни советы автора.</p>;
 }
 return <div className="se-video-rich-content">
  {items.map((item,index)=>{
   if(typeof item==="string"){
    if(item.startsWith("## "))return <h2 key={"h2-"+index} style={{fontSize:"clamp(24px,3vw,35px)",lineHeight:1.2,margin:"42px 0 18px",fontFamily:"Georgia,serif",fontWeight:400}}>{item.slice(3)}</h2>;
    if(item.startsWith("### "))return <h3 key={"h3-"+index} style={{fontSize:"clamp(19px,2vw,25px)",lineHeight:1.35,margin:"31px 0 12px",fontWeight:700}}>{item.slice(4)}</h3>;
    return <p key={"p-"+index}>{item}</p>;
   }
   return <figure className="se-editorial-figure" key={item._key||"img-"+index}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={item.url} alt={item.alt} loading="lazy"/>
    <figcaption><span>{item.caption}</span>{item.credit&&<small>Фото: {item.credit}</small>}</figcaption>
   </figure>;
  })}
 </div>;
}

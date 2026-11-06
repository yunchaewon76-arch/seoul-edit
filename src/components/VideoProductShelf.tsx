import {type EditorialProduct,safeRetailerLink,screenshotReferenceProducts} from "@/data/video-products";
import {getProductImage} from "@/data/product-image";
export default function VideoProductShelf({products,showReference=false}:{products:EditorialProduct[];showReference?:boolean}){
 return <section className="se-products" aria-labelledby="se-products-heading">
  <div className="se-product-head"><div><span className="eyebrow">THE PRODUCT NOTES</span><h2 id="se-products-heading">Что использовали в видео?</h2></div><p>Средства, которые упоминались в выпуске, и ссылки на точные товарные карточки.</p></div>
  {products.length>0?<div className="se-product-grid">
   {products.map((p,i)=>{
    const link=safeRetailerLink(p);
    const visual=getProductImage(p);
    return <article className="se-product-card" key={p.id}>
     <figure className="se-product-art se-product-art--image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={visual.src} alt={visual.alt} width={720} height={720} loading="lazy" decoding="async"/>
      <figcaption className={"se-product-art-credit"+(visual.kind==="fallback"?" se-product-art-credit--pending":"")}>{visual.credit}</figcaption>
     </figure>
     <span className="se-product-role">{p.originalOrAlternative==="alternative"?"АЛЬТЕРНАТИВА":"ПРОДУКТ ИЗ ВИДЕО"}</span>
     <h3>{p.brand}</h3><p>{p.name}{p.variant?" · "+p.variant:""}</p>
     {p.originalOrAlternative==="alternative"&&<div className="se-product-reason"><strong>Вместо: {p.alternativeFor}</strong><span>{p.whyComparable}</span></div>}
     {link?<a className="se-product-buy" target="_blank" rel="noopener noreferrer" href={link}>Смотреть в {p.russianRetailer||"магазине"} ↗</a>:
      <span className="se-product-unverified" aria-label="Точная ссылка пока не добавлена">Ссылка появится позднее</span>}
     {/* Internal SKU checks and date logs stay in structured source data, not the reader-facing card. */}
    </article>;
   })}
  </div>:<div className="se-product-empty"><strong>Список средств из этих роликов ещё проверяется.</strong><p>Мы не приписываем авторам неупомянутые продукты и не подбираем «аналоги» без подтверждённого исходного средства. После просмотра оригинала здесь появятся карточки с точными названиями и проверенными ссылками на российские магазины.</p></div>}
  {showReference&&<div className="se-reference-shelf">
   <div className="se-reference-heading"><span>ПРИМЕР ОФОРМЛЕНИЯ ПО ВАШЕМУ РЕФЕРЕНСУ</span><p>Эти товары видны на присланном вами примере дизайна. Их упоминание в двух YouTube-видео и продажи в России не подтверждены.</p></div>
   <div className="se-product-grid">
    {screenshotReferenceProducts.map((p,i)=><div className="se-product-card se-reference-product" key={p.brand}>
     <div className={"se-product-art se-product-art-"+(i?"cream":"blue")}><div className="se-bottle"><span>{p.brand}</span><small>{p.name}</small></div></div>
     <h3>{p.brand}</h3><p>{p.name}</p><span className="se-product-unverified">Проверяем точную ссылку</span>
     <small className="se-product-disclaimer">{p.note}</small>
    </div>)}
   </div>
   <div className="se-alternative-note"><span>АЛЬТЕРНАТИВА</span><strong>Будет добавлена только после проверки.</strong><p>Для сопоставления нужны исходный продукт, назначение, ключевые свойства и подтверждённая страница аналога в российском магазине. Замена не означает идентичного состава или результата.</p></div>
  </div>}
 </section>;
}

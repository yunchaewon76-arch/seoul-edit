import Link from "next/link";
import {productCards} from "@/data/published-review-products";
import styles from "./PublishedProductShelf.module.css";

const art=(name:string):string=>{
 const s=name.toLowerCase();
 if(/hair|conditioner|shampoo|scalp|Dyson|silk therapy/i.test(name))return "/products/fallback/skincare.svg";
 if(/parfum|perfume|eau de parfum|fragrance/i.test(name))return "/products/fallback/lips.svg";
 if(/lip|balm/i.test(name))return "/products/fallback/lips.svg";
 if(/blush|cheek|patch/i.test(name))return "/products/fallback/cheek.svg";
 if(/coat|bomber|jacket|zara/i.test(name))return "/editorial/vintage-watch.svg";
 return "/products/fallback/skincare.svg";
};
export default function PublishedProductShelf({slug}:{slug:string}){
 const goods=productCards[slug]||[];
 if(!goods.length)return null;
 return <section className={styles.section} id="shop">
  <div className={styles.top}><span className="eyebrow">SHOP THE STORY</span><h2>Средства и вещи из статьи</h2><p>Все идентифицированные товары показаны отдельно. Ссылка на магазин есть только там, где найдена соответствующая товарная карточка; иначе — ссылка на первоисточник или бренд.</p></div>
  <div className={styles.grid}>{goods.map((p,i)=>{
   const href=p.href||p.originalProductUrl||p.sourceUrl;
   return <article className={styles.card} key={p.name}>
     <a href={href} className={styles.image} target="_blank" rel="noopener noreferrer nofollow" aria-label={"Подробнее о "+p.name}>
       {/* First-party illustrated artwork; external publisher photos require permission and are never copied here. */}
       {/* eslint-disable-next-line @next/next/no-img-element */}
       <img src={art(p.name)} loading="lazy" alt={"Схематическая авторская иллюстрация категории товара: "+p.name}/>
     </a>
     <div className={styles.copy}>
      <span className={styles.tag}>{p.href?"ТОВАРНАЯ КАРТОЧКА":"СМОТРЕТЬ У ИСТОЧНИКА"}</span>
      <h3>{p.name}</h3><p>{p.format||""}</p>
      <a className={styles.shopLink} href={href} target="_blank" rel="noopener noreferrer nofollow">{p.href?"Открыть магазин ↗":p.originalProductUrl?"Официальное описание ↗":"Смотреть в оригинале ↗"}</a>
      <span className={styles.credit}>Иллюстрация SEOUL EDIT · фото оригинального товара по ссылке</span>
     </div>
   </article>;
  })}</div>
  <p className={styles.foot}>Покупка совершается на стороннем сайте. Актуальная цена и наличие зависят от продавца. Ссылки не гарантируют доставку в конкретный город.</p>
 </section>;
}

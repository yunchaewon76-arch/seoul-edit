import Link from "next/link";
import type {ReactNode} from "react";
import approvedPosts from "@/data/approved-posts.json";
import styles from "./ApprovedPostPage.module.css";

type ApprovedPost=(typeof approvedPosts)[number];

function inline(raw:string):ReactNode[]{
 const expression=/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g;
 return raw.split(expression).filter(Boolean).map((part,i)=>{
  if(part.startsWith("**")&&part.endsWith("**"))return <strong key={i}>{part.slice(2,-2)}</strong>;
  if(part.startsWith("*")&&part.endsWith("*"))return <em key={i}>{part.slice(1,-1)}</em>;
  const match=part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
  if(match)return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer nofollow">{match[1]} ↗</a>;
  return <span key={i}>{part}</span>;
 });
}
function editorialBody(markdown:string,illustration:string){
 const lines=markdown.replace(/\r/g,"").split("\n");
 const nodes:ReactNode[]=[];
 let headingSeen=false;
 let inCallout=false;
 for(let i=0;i<lines.length;i++){
  let line=lines[i].trim();
  if(!line)continue;
  if(line.startsWith("<callout")){inCallout=true;continue;}
  if(line==="</callout>"){inCallout=false;continue;}
  if(line==="[[EDITORIAL_IMAGE]]"){
   nodes.push(<figure className={styles.inlineIllustration} key={i}><img src={illustration} alt="Авторская инфографика SEOUL EDIT; не фотографии продуктов"/><figcaption>Иллюстрация SEOUL EDIT. Это не реальные оттенки или фотографии конкретных товаров.</figcaption></figure>);
   continue;
  }
  if(line==="---"||line==="## Источники и фактчекинг"&&i===lines.length-1)continue;
  if(/^# /.test(line)){
   if(!headingSeen){headingSeen=true;continue;}
   nodes.push(<h2 key={i}>{inline(line.slice(2))}</h2>);continue;
  }
  if(/^## /.test(line)){nodes.push(<h2 key={i}>{inline(line.slice(3))}</h2>);continue;}
  if(/^### /.test(line)){nodes.push(<h3 key={i}>{inline(line.slice(4))}</h3>);continue;}
  if(line.startsWith(">")){nodes.push(<blockquote key={i}>{inline(line.replace(/^>\s?/,""))}</blockquote>);continue;}
  if(/^- /.test(line)){
   const bullets=[line.slice(2)];
   while(i+1<lines.length&&/^- /.test(lines[i+1].trim())){i++;bullets.push(lines[i].trim().slice(2));}
   nodes.push(<ul key={"bullets"+i}>{bullets.map((b,j)=><li key={j}>{inline(b)}</li>)}</ul>);continue;
  }
  if(/^\d+\. /.test(line)){
   const numbers=[line.replace(/^\d+\.\s/,"")];
   while(i+1<lines.length&&/^\d+\. /.test(lines[i+1].trim())){i++;numbers.push(lines[i].trim().replace(/^\d+\.\s/,""));}
   nodes.push(<ol key={"numbers"+i}>{numbers.map((b,j)=><li key={j}>{inline(b)}</li>)}</ol>);continue;
  }
  if(line.startsWith("|")){
   const cells=[line];
   while(i+1<lines.length&&lines[i+1].trim().startsWith("|")){i++;cells.push(lines[i].trim());}
   const rows=cells.filter(c=>!/^\|?[\s:-]+\|/.test(c)).map(c=>c.split("|").slice(1,-1));
   nodes.push(<div className={styles.tableScroll} key={"table"+i}><table><tbody>{rows.map((r,j)=><tr key={j}>{r.map((c,k)=>j===0?<th key={k}>{inline(c.trim())}</th>:<td key={k}>{inline(c.trim())}</td>)}</tr>)}</tbody></table></div>);continue;
  }
  nodes.push(<p className={inCallout?styles.callout:undefined} key={i}>{inline(line)}</p>);
 }
 return nodes;
}

const products:Record<string,{name:string;label:string;summary:string;url:string;merchant:string;status:"same"|"alt"|"source";category:string}[]>={
 "autumn-baked-blush-korea-2026":[
 {name:"YSL Make Me Blush Cream · 23 Hot Mauve",label:"Оригинал Allure",summary:"Кремовый розово-лиловый оттенок. Точная российская карточка пока не найдена — смотрите официальные фото.",url:"https://www.yslbeauty.com/int/makeup/face/blush-bronzer/make-me-blush-cream/3614274932560.html",merchant:"YSL Beauty · фото и состав",status:"source",category:"КРЕМОВЫЕ РУМЯНА"},
 {name:"HERA Blush · 456 Nutshell",label:"Оригинал Allure",summary:"Пудровые baked-румяна с тонкой сияющей текстурой; номер оттенка 456.",url:"https://int.hera.com/products/hera-blush",merchant:"HERA · официальный продукт",status:"source",category:"ПУДРОВЫЕ РУМЯНА"},
 {name:"NARS Afterglow · Wanderlust",label:"Другой оттенок",summary:"В Allure — Behave. В российской карточке — Wanderlust: это та же жидкая линейка, но иной лиловый оттенок.",url:"https://www.letu.ru/product/zhidkie-rumyana-afterglow-liquid-blush/173400497/sku/189200597",merchant:"ЛЭТУАЛЬ",status:"alt",category:"ЖИДКИЕ РУМЯНА"},
 {name:"3CE Face Blush · CITY MAUVE",label:"Редакционная альтернатива",summary:"Матовая пудровая текстура; не копия кремовых YSL или HERA Nutshell.",url:"https://www.letu.ru/product/3ce-matovye-rumyana-dlya-litsa-face-blush/178700110/sku/194400156",merchant:"ЛЭТУАЛЬ",status:"alt",category:"МАТОВЫЕ РУМЯНА"},
 {name:"Make Up For Ever · B300 Anywhere Peach",label:"Оригинал Allure",summary:"Матовый светло-персиковый оттенок; прямой надёжный российский товарный листинг не подтверждён.",url:"https://www.makeupforever.com/us/en/face/blush/artist-blush-I000069300.html",merchant:"Make Up For Ever · официальные фото",status:"source",category:"ПЕРСИКОВЫЕ РУМЯНА"}
 ],
 "hwahae-awards-2026-global-pick-products":[
 {name:"ANUA PDRN Hyaluronic Acid Capsule 100 · 30 мл",label:"Точная модель",summary:"Показана в официальном сообщении Hwahae. Не гарантируем наличие и лечебный эффект.",url:"https://goldapple.ru/19000393084-hyaluronic-acid",merchant:"Золотое Яблоко",status:"same",category:"СЫВОРОТКА"},
 {name:"COSRX The 6 Peptide Skin Booster · 150 мл",label:"Точная модель",summary:"Сыворотка с комплексом пептидов; магазин может требовать проверку браузера. Наличие не подтверждено.",url:"https://goldapple.ru/19000281404-the-6-peptide",merchant:"Золотое Яблоко",status:"same",category:"ПЕПТИДНЫЙ БУСТЕР"},
 {name:"ANUA Rice 7 Ceramide · 50 мл",label:"Альтернатива по задаче",summary:"Другой состав для барьерного ухода, не аналог PDRN по молекуле. В момент проверки не было в наличии.",url:"https://goldapple.ru/19000353681-rice-7-ceramide",merchant:"Золотое Яблоко · нет в наличии",status:"alt",category:"УХОД ЗА БАРЬЕРОМ"}
 ]
};
export default function ApprovedPostPage({post}:{post:ApprovedPost}){
 const shopping=products[post.slug]||[];
 return <div className="container article-wrap">
  <Link className="back" href="/beauty">← Красота</Link>
  <div className="eyebrow">SEOUL EDIT / BEAUTY DECODED / ГИД ПО ПРОДУКТАМ</div>
  <header className={styles.articleHeader}><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-byline">РЕДАКЦИЯ SEOUL EDIT · 18 ОКТЯБРЯ 2026 · РУССКАЯ РЕДАКЦИЯ</div></header>
  <figure className={styles.hero}><img src={post.image} alt="Авторская иллюстрация SEOUL EDIT, не фотография продукта"/><figcaption>Иллюстрация SEOUL EDIT · самостоятельная схема, не реальные оттенки или упаковки товаров.</figcaption></figure>
  <div className={styles.columns}><aside className={styles.rail}><span>SEOUL EDIT</span><strong>Проверили.<br/>Объяснили.<br/>Сравнили.</strong><a href="#shop">Средства и магазины ↓</a><a href={post.primarySource} target="_blank" rel="noopener noreferrer">Первоисточник ↗</a></aside>
   <article className={styles.body}>{editorialBody(post.markdown,post.image)}
    <section className={styles.productSection} id="shop"><span className="eyebrow">SHOP THE RESEARCH</span><h2>Продукты и ссылки для России</h2><p>Фотографии и точные варианты можно посмотреть на официальных страницах брендов и продавцов. Здесь — оригинальные продукты и отдельно помеченные альтернативы. Наличие в вашем городе не гарантируется.</p>
      <div className={styles.productGrid}>{shopping.map((p,i)=><a key={p.name} className={styles.productCard} href={p.url} target="_blank" rel="noopener noreferrer nofollow"><div className={styles.productVisual} aria-hidden="true"><span>{String(i+1).padStart(2,"0")}</span><strong>{p.name.split(" ")[0]}</strong><small>{p.category}</small></div><div className={styles.productInfo}><span className={styles.productStatus}>{p.label}</span><h3>{p.name}</h3><p>{p.summary}</p><span className={styles.merchant}>{p.merchant} ↗</span></div></a>)}</div>
      <p className={styles.note}>Сами фото магазинов здесь не воспроизводятся без разрешения. Представленные карточки — авторская типографическая графика, а не изображения упаковки.</p>
    </section>
   </article>
  </div>
  <nav className={styles.bottomNav}><Link href="/beauty">← Все статьи о красоте</Link><Link href="/signal">Все материалы ↗</Link></nav>
 </div>;
}

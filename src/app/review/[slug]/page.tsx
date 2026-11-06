import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import part1 from "@/data/approved-review-20261106-1.json";
import part2 from "@/data/approved-review-20261106-2.json";
import part3 from "@/data/approved-review-20261106-3.json";
import part4 from "@/data/approved-review-20261106-4.json";
import {expiredSet,productCards} from "@/data/editorial-review-publishing";
import {readerMarkdown} from "@/lib/editorial-reader";
import ReviewActions from "@/components/ReviewActions";
import styles from "./page.module.css";

const articles=[...part1,...part2,...part3,...part4].filter(a=>!expiredSet.has(a.slug));
type Article=(typeof articles)[number];
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"SEOUL EDIT · Редакционный предпросмотр",robots:{index:false,follow:false,nocache:true}};

function inline(value:string):ReactNode[]{
 const plain=value.replace(/<b>/gi,"**").replace(/<\/b>/gi,"**").replace(/<i>/gi,"*").replace(/<\/i>/gi,"*").replace(/<[^>]*>/g,"");
 const parts=plain.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g).filter(Boolean);
 return parts.map((x,i)=>{
  if(x.startsWith("**")&&x.endsWith("**"))return <strong key={i}>{x.slice(2,-2)}</strong>;
  if(x.startsWith("*")&&x.endsWith("*"))return <em key={i}>{x.slice(1,-1)}</em>;
  const a=x.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
  if(a)return <a key={i} href={a[2]} target="_blank" rel="nofollow noopener noreferrer">{a[1]}</a>;
  return <span key={i}>{x}</span>;
 });
}
function contentNodes(md:string):ReactNode[]{
 const raw=readerMarkdown(md);
 const lines=raw.replace(/\r/g,"").split("\n");
 const out:ReactNode[]=[];
 for(let i=0;i<lines.length;i++){
  const s=lines[i].trim();
  if(!s||s==="---")continue;
  if(s.startsWith("# "))continue;
  if(s.startsWith("## ")){out.push(<h2 key={i}>{inline(s.slice(3))}</h2>);continue;}
  if(s.startsWith("### ")){out.push(<h3 key={i}>{inline(s.slice(4))}</h3>);continue;}
  if(/^[-*] /.test(s)){
   const a=[s.slice(2)];while(i+1<lines.length&&/^[-*] /.test(lines[i+1].trim()))a.push(lines[++i].trim().slice(2));
   out.push(<ul key={"ul"+i}>{a.map((v,k)=><li key={k}>{inline(v)}</li>)}</ul>);continue;
  }
  if(/^\d+\. /.test(s)){
   const a=[s.replace(/^\d+\.\s+/,"")];while(i+1<lines.length&&/^\d+\. /.test(lines[i+1].trim()))a.push(lines[++i].trim().replace(/^\d+\.\s+/,""));
   out.push(<ol key={"ol"+i}>{a.map((v,k)=><li key={k}>{inline(v)}</li>)}</ol>);continue;
  }
  if(/^<[^>]+>$/.test(s))continue;
  out.push(<p key={i}>{inline(s)}</p>);
 }
 return out;
}

export default async function ReviewArticle({params}:{params:Promise<{slug:string}>}){
 if(process.env.VERCEL_ENV==="production")notFound();
 const {slug}=await params;
 const a=articles.find(x=>x.slug===slug) as Article|undefined;
 if(!a)notFound();
 const products=productCards[slug]||[];
 return <main className={styles.shell}>
   <header className={styles.top}>
      <Link href="/review" className={styles.brand}>SEOUL EDIT</Link>
      <span className={styles.editorOnly}>EDITORIAL PREVIEW · PRIVATE</span>
   </header>
   <nav className={styles.nav}><Link href="/review">← Все 21 статья</Link><a href={a.notionUrl} target="_blank" rel="noopener noreferrer">Оригинал в Notion ↗</a></nav>
   <article>
      <div className={styles.meta}><span>{a.cat.toUpperCase()} · SEOUL EDIT</span><span>PRIVATE READER EDITION</span></div>
      <h1 className={styles.title}>{a.title}</h1>
      <div className={styles.cover} data-slug={slug} aria-label={"Редакционная AI-иллюстрация: "+a.title}>
        <div className={styles.coverPlaceholder}><span>SEOUL EDIT / COVER REVIEW</span><strong>{a.cat}</strong><small>Иллюстрация к материалу · финальная проверка изображения</small></div>
      </div>
      <div className={styles.layout}>
        <aside className={styles.rail}>
          <span>THE SEOUL EDIT</span>
          <strong>Красота.<br/>Мода.<br/>Культура.</strong>
          <a href={a.sourceUrl} target="_blank" rel="nofollow noopener noreferrer">Корейский источник ↗</a>
        </aside>
        <div className={styles.body}>{contentNodes(a.markdown)}</div>
      </div>
      {products.length>0&&<section className={styles.products} aria-label="Товары из статьи">
        <div className={styles.productsHead}><p>SHOP THE STORY</p><h2>Средства и вещи из статьи</h2><span>Прямые ссылки на найденные товарные карточки</span></div>
        <div className={styles.productGrid}>
        {products.map((p,i)=><article className={styles.product} key={i}>
          <a className={styles.productImage} href={p.href} target="_blank" rel="nofollow sponsored noopener noreferrer">
             {/* External merchant image is shown only in this protected review; clear credit and rights gate below. */}
             <img loading="lazy" alt={p.name} src={p.image}/>
          </a>
          <div className={styles.productCopy}><small>{p.merchant}</small><h3>{p.name}</h3><p>{p.format||""}</p><a href={p.href} target="_blank" rel="nofollow sponsored noopener noreferrer">Посмотреть товар ↗</a><span>{p.imageCredit}</span></div>
        </article>)}
        </div>
        <p className={styles.productDisclaimer}>Фото каталогов используются для редакционной проверки и требуют разрешения перед публичным размещением. Ассортимент и цена определяются продавцом.</p>
      </section>}
   </article>
   <ReviewActions slug={a.slug} title={a.title}/>
   <footer className={styles.footer}><span>© SEOUL EDIT · Редакционный предпросмотр</span><Link href="/review">Все материалы ↗</Link></footer>
 </main>;
}

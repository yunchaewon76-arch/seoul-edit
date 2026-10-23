import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import articles from "@/data/editorial-review-20261023.json";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "SEOUL EDIT · Editorial Review", robots: { index: false, follow: false } };
type Article = (typeof articles)[number];

function inline(value: string): ReactNode[] {
  const plain = value
    .replace(/<b>/g, "**").replace(/<\/b>/g, "**")
    .replace(/<i>/g, "*").replace(/<\/i>/g, "*")
    .replace(/<[^>]*>/g, "");
  const parts = plain.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g).filter(Boolean);
  return parts.map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) return <strong key={index}>{chunk.slice(2, -2)}</strong>;
    if (chunk.startsWith("*") && chunk.endsWith("*")) return <em key={index}>{chunk.slice(1, -1)}</em>;
    const link = chunk.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) return <a key={index} href={link[2]} rel="noopener noreferrer nofollow" target="_blank">{link[1]} ↗</a>;
    return <span key={index}>{chunk}</span>;
  });
}

function contentNodes(markdown: string): ReactNode[] {
  const start = markdown.search(/^# /m);
  const raw = (start < 0 ? markdown : markdown.slice(start)).replaceAll("\r", "");
  const lines = raw.split("\n");
  const items: ReactNode[] = [];
  let seenTitle = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === "---") continue;
    if (line.startsWith("# ")) {
      if (!seenTitle) { seenTitle = true; continue; }
      items.push(<h2 key={i}>{inline(line.slice(2))}</h2>);
      continue;
    }
    if (line.startsWith("## ")) { items.push(<h2 key={i}>{inline(line.slice(3))}</h2>); continue; }
    if (line.startsWith("### ")) { items.push(<h3 key={i}>{inline(line.slice(4))}</h3>); continue; }
    if (/^- \[[x ]\] /.test(line)) continue; // internal review checklist is kept in Notion
    if (line.startsWith("- ")) {
      const children = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) children.push(lines[++i].trim().slice(2));
      items.push(<ul key={"ul" + i}>{children.map((v,j)=><li key={j}>{inline(v)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const children = [line.replace(/^\d+\.\s+/, "")];
      while (i + 1 < lines.length && /^\d+\. /.test(lines[i + 1].trim())) children.push(lines[++i].trim().replace(/^\d+\.\s+/, ""));
      items.push(<ol key={"ol" + i}>{children.map((v,j)=><li key={j}>{inline(v)}</li>)}</ol>);
      continue;
    }
    if (/^<[^>]+>$/.test(line)) continue;
    items.push(<p key={i}>{inline(line)}</p>);
  }
  return items;
}

export default async function ReviewArticle({params}: {params: Promise<{slug:string}>}) {
  // Fail closed: production must never expose a draft review route.
  if (process.env.VERCEL_ENV === "production") notFound();
  const {slug} = await params;
  const article = articles.find(a=>a.slug===slug) as Article|undefined;
  if (!article) notFound();
  return <main className={styles.shell}>
    <header className={styles.top}>
      <Link href="/"><strong>SEOUL EDIT</strong></Link>
      <span>EDITORIAL REVIEW · NOT FOR PUBLICATION</span>
    </header>
    <nav className={styles.nav} aria-label="Other review articles">
      {articles.map(a=><Link href={"/review/"+a.slug} key={a.slug} aria-current={a.slug===slug?"page":undefined}>{a.cat} · {a.display}</Link>)}
    </nav>
    <article>
      <div className={styles.meta}><span>{article.cat.toUpperCase()} / POST</span><span>NOTION V3 · 23.10.2026</span></div>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.deck}>Расширенная редакционная статья SEOUL EDIT. Предпросмотр без публикации. Информация о товарах и заведениях требует проверки непосредственно перед публикацией.</p>
      <div className={styles.hero+" "+styles[article.visual]}>
        <div className={styles.heroInner}><span>SEOUL EDIT / VISUAL REVIEW</span><strong>{article.cat}</strong><small>AI cover is created separately; upload to Sanity pending</small></div>
      </div>
      <div className={styles.layout}>
        <aside className={styles.rail}>
          <strong>Проверили.<br/>Объяснили.<br/>Сравнили.</strong>
          <p>EDITORIAL / PREVIEW ONLY</p>
          <a href={article.notionUrl} target="_blank" rel="noopener noreferrer">Оригинал в Notion ↗</a>
          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Корейский первоисточник ↗</a>
        </aside>
        <div className={styles.body}>{contentNodes(article.markdown)}</div>
      </div>
    </article>
    <footer className={styles.footer}>SEOUL EDIT · Work in progress · Publishing requires editor approval · <Link href={article.notionUrl}>Notion</Link></footer>
  </main>;
}

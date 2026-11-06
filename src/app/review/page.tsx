import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import part1 from "@/data/approved-review-20261106-1.json";
import part2 from "@/data/approved-review-20261106-2.json";
import part3 from "@/data/approved-review-20261106-3.json";
import part4 from "@/data/approved-review-20261106-4.json";
import styles from "./index.module.css";
import { expiredSet } from "@/data/editorial-review-publishing";

const approved = [...part1,...part2,...part3,...part4].filter(a=>!expiredSet.has(a.slug));

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
 title: "SEOUL EDIT · 21 статья на редакционной проверке",
 description: "Закрытая редакционная проверка, без публикации",
 robots: { index: false, follow: false, nocache: true }
};

export default function EditorialReviewIndex(){
 if(process.env.VERCEL_ENV==="production") notFound();
 return <main className={styles.root}>
   <header className={styles.header}>
    <Link href="/">SEOUL EDIT</Link>
    <span>EDITORIAL DESK / PRIVATE REVIEW</span>
   </header>
   <section className={styles.intro}>
    <p className={styles.eyebrow}>CONTENT PIPELINE · CURATED FOR READERS · 06 NOV 2026</p>
    <h1>21 статья <em>на проверке</em></h1>
    <p>Полезные гиды по корейской красоте, стилю и городской жизни. Завершившиеся мероприятия скрыты, внутренняя проверочная переписка удалена из читательского просмотра. Проверяйте товары, обложки и читаемость на компьютере и телефоне.</p>
    <div className={styles.counter}>21 / 21 · Черновики · Не опубликовано</div>
   </section>
   <div className={styles.list}>
    {approved.map((a,i)=><article className={styles.item} key={a.slug}>
      <div className={styles.number}>{String(i+1).padStart(2,"0")}</div>
      <div className={styles.detail}>
        <p className={styles.tags}><span>{a.priority}</span> <span>{a.cat}</span> <span>V3</span></p>
        <h2><Link href={"/review/"+a.slug}>{a.title}</Link></h2>
        <div className={styles.links}><Link href={"/review/"+a.slug}>Открыть предпросмотр ↗</Link><a href={a.notionUrl} target="_blank" rel="noopener noreferrer">Исходник в Notion ↗</a></div>
      </div>
    </article>)}
   </div>
   <footer className={styles.footer}>SEOUL EDIT · Пять завершившихся мероприятий исключены из проверки. Публикация возможна только после редакционного разрешения.</footer>
 </main>
}

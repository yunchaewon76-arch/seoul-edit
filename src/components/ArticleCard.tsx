import Link from "next/link";
import type { Article } from "@/data/articles";
import { categoryName,dateLabel } from "@/data/articles";
import { photoFor } from "@/data/visuals";
import styles from "./ArticleCard.module.css";
export default function ArticleCard({story}:{story:Article}){
 const photo=photoFor(story);
 return <Link className="story-card signal-card" href={"/article/"+story.slug}>
  <div className={"story-art "+styles.art}>
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={photo.src} alt={photo.alt} loading="lazy"/>
   <span className={styles.credit} title={photo.credit}>IMAGE: {photo.credit}</span>
   <span className="image-arrow" aria-hidden="true">↗</span>
  </div>
  <div className="story-meta"><span>{categoryName(story.category)}</span><span className="meta-dot" aria-hidden="true">·</span><span>{story.format==="brief"?"QUICK READ":"DEEP DIVE"}</span></div>
  <h3>{story.title}</h3><p>{story.excerpt}</p>
  <div className="signal-card-foot"><small>{dateLabel(story.date)}</small><span>{story.sources.length} источника / {story.readingMinutes} мин</span></div>
 </Link>;
}

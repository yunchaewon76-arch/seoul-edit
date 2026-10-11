import Link from "next/link";
import type { Article } from "@/data/articles";
import { categoryName, dateLabel } from "@/data/articles";
import { photoFor } from "@/data/visuals";

export default function ArticleCard({story}: {story:Article}) {
 const photo=photoFor(story);
 return <Link className="story-card" href={"/article/"+story.slug}>
   <div className="story-art">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={photo.src} alt={photo.alt} loading="lazy"/><span className="image-arrow" aria-hidden="true">↗</span></div>
   <div className="story-meta"><span>{categoryName(story.category)}</span><span className="meta-dot" aria-hidden="true">·</span><span>{story.format==="brief"?"TREND BRIEF":"EDITORIAL"}</span><span className="demo">ДЕМО</span></div>
   <h3>{story.title}</h3><p>{story.excerpt}</p><small>{dateLabel(story.date)}</small>
 </Link>;
}

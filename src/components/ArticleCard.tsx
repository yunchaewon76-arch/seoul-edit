import Link from "next/link";
import type { Article } from "@/data/articles";
import { categoryName, formatName, dateLabel } from "@/data/articles";

export default function ArticleCard({story}: {story:Article}) {
  return <Link className="story-card" href={"/article/" + story.slug}>
    <div className={"story-art story-art--" + story.cover}>
      <span className="art-mark">SEOUL EDIT</span><span className="art-shape" aria-hidden="true"/>
    </div>
    <div className="story-meta"><span>{categoryName(story.category)} · {formatName(story.format)}</span><span className="demo">ДЕМО</span></div>
    <h3>{story.title}</h3><p>{story.excerpt}</p><small>{dateLabel(story.date)}</small>
  </Link>;
}

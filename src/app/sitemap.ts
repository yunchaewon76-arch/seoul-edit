import type {MetadataRoute} from "next";
import approvedPosts from "@/data/approved-posts.json";
const root="https://seoul-edit-web.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{
 const pages=["/","/beauty","/fashion","/trends","/signal","/video","/ask"].map(path=>({
  url:root+path,changeFrequency:"weekly" as const,priority:path==="/"?1:0.6
 }));
 const articles=approvedPosts.map(a=>({
  url:root+"/article/"+a.slug,
  lastModified:new Date(a.date+"T12:00:00Z"),
  changeFrequency:"monthly" as const,
  priority:0.75
 }));
 return [...pages,...articles];
}

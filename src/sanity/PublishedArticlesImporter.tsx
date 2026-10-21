"use client";

import {useCallback,useEffect,useMemo,useState} from "react";
import {useClient} from "sanity";
import approvedPosts from "../data/approved-posts.json";

const slugs=approvedPosts.map(article=>article.slug);
const query='array::unique(*[_type == "editorialArticle" && defined(slug.current) && slug.current in $slugs].slug.current)';

function makeArticle(article:(typeof approvedPosts)[number]){
 const category="category" in article && (article.category==="fashion"||article.category==="trends")?article.category:"beauty";
 const content=article.markdown.replace(/\r/g,"").split(/\n+/).map(line=>line.trim()).filter(Boolean);
 const plainText=content.filter(line=>!line.startsWith("#")&&!line.startsWith("<")&&!line.startsWith("[[")&&!line.startsWith("|"));
 return {
  _id:"seoul-edit-article-"+article.slug,
  _type:"editorialArticle",
  title:article.title,
  slug:{_type:"slug",current:article.slug},
  editorialStatus:"published",
  category,
  format:"editorial",
  publishedAt:article.date,
  excerpt:article.excerpt,
  markdown:article.markdown,
  coverIllustrationUrl:article.image,
  notionId:article.notionId,
  priority:article.priority,
  bodyParagraphs:plainText.length?plainText:[article.excerpt],
  signal:"Материал подготовлен редакцией SEOUL EDIT с указанием корейского первоисточника; ссылки на конкретные товары проверяются отдельно.",
  context:article.excerpt,
  caution:"Редакционные изображения иллюстративные; цены и наличие товаров у продавцов меняются. Оценки популярности относятся к указанным источникам.",
  tags:[category==="fashion"?"K-fashion":category==="trends"?"K-culture":"K-beauty","Россия","SEOUL EDIT"],
  readingMinutes:Math.max(3,Math.min(30,Math.ceil(article.markdown.length/900))),
  sources:[{_key:"original",title:"Корейский первоисточник",url:article.primarySource,kind:"КОРЕЙСКИЙ ИСТОЧНИК"}]
 };
}

export default function PublishedArticlesImporter(){
 const baseClient=useClient({apiVersion:"2026-10-01"});
 const client=useMemo(()=>baseClient.withConfig({perspective:"raw"}),[baseClient]);
 const [existing,setExisting]=useState<string[]>([]);
 const [checking,setChecking]=useState(true);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");

 const refresh=useCallback(async()=>{
  const found=await client.fetch<string[]>(query,{slugs});
  const list=Array.isArray(found)?found:[];
  setExisting(list);
  return list;
 },[client]);

 useEffect(()=>{
  let active=true;
  client.fetch<string[]>(query,{slugs}).then(found=>{if(active)setExisting(Array.isArray(found)?found:[]);})
   .catch(err=>{if(active)setError("Sanity 문서 확인 실패: "+(err instanceof Error?err.message:String(err)));})
   .finally(()=>{if(active)setChecking(false);});
  return ()=>{active=false;};
 },[client]);

 const importArticles=async()=>{
  if(busy)return;
  setBusy(true);setError("");setMessage("");
  try{
   const found=new Set(await refresh());
   const missing=approvedPosts.filter(article=>!found.has(article.slug));
   if(!missing.length){setMessage("기사 5편이 이미 Sanity에 있습니다. 기존 문서는 덮어쓰지 않았습니다.");return;}
   let transaction=client.transaction();
   for(const article of missing)transaction=transaction.createIfNotExists(makeArticle(article));
   await transaction.commit();
   const verified=await refresh();
   const imported=missing.filter(article=>verified.includes(article.slug)).length;
   setMessage(imported+"편을 Sanity 일반 기사(Articles)에 등록했습니다. 기존 "+found.size+"편은 유지했습니다. 등록된 기사는 게시 승인 상태입니다.");
  }catch(err){
   setError("등록 실패: "+(err instanceof Error?err.message:String(err))+". Sanity 로그인 및 쓰기 권한을 확인하세요.");
  }finally{setBusy(false);}
 };

 const count=approvedPosts.length;
 return <div style={{maxWidth:1000,margin:"0 auto",padding:"clamp(20px,4vw,48px)",fontFamily:"system-ui,sans-serif",lineHeight:1.65}}>
  <div style={{fontSize:12,color:"#a13440",fontWeight:800,letterSpacing:".12em"}}>SEOUL EDIT / SANITY ARTICLE MIGRATION</div>
  <h1 style={{fontSize:"clamp(25px,3vw,38px)",lineHeight:1.2,margin:"13px 0"}}>발행 기사 {count}편 Sanity 등록</h1>
  <p>기존 웹사이트에 공개된 러시아어 기사 <strong>{count}편</strong>을 <strong>📰 일반 기사 / Articles</strong> 문서로 가져옵니다. 영상 전용 메뉴와 구분됩니다.</p>
  <p>글 제목, Markdown 전체 원고, 카테고리, P1/P2 우선순위, 원문 출처와 자체 이미지 경로가 보존됩니다. <strong>기존 Sanity 기사와 같은 URL은 덮어쓰지 않습니다.</strong></p>
  <div style={{background:"#f8eee9",borderLeft:"4px solid #a13440",padding:"14px 18px",margin:"19px 0"}}>
   <strong>기존 발행 승인 기사만 가져옵니다</strong>
   <p style={{margin:"6px 0 0",fontSize:13}}>이미 사이트에 게시된 5편만 Published로 등록합니다. 원고 검증 중인 PONY 영상이나 승인만 받은 아이디어는 가져오지 않습니다. 사진은 자체 제작 SVG 경로만 연결되며 Sanity 미디어 라이브러리에 복사하지 않습니다.</p>
  </div>
  <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",padding:"10px 0"}}>
   <button type="button" disabled={checking||busy||existing.length===count} onClick={()=>{void importArticles();}}
    style={{padding:"12px 18px",minHeight:44,color:"#fff",background:checking||busy||existing.length===count?"#96918f":"#222",border:"none",fontWeight:750,cursor:checking||busy||existing.length===count?"default":"pointer"}}>
    {checking?"기존 기사 확인 중…":busy?"Sanity에 등록 중…":existing.length===count?"기사 5편 모두 Sanity에서 확인됨":"미등록 발행 기사 Sanity에 가져오기"}
   </button>
   <span style={{fontSize:13,color:"#6f6460"}}>Sanity에 확인된 기사: {checking?"확인 중":existing.length+" / "+count}</span>
  </div>
  {message&&<p role="status" style={{padding:12,background:"#ebf6ef"}}>{message}</p>}
  {error&&<p role="alert" style={{padding:12,background:"#fff0ee"}}>{error}</p>}
  <h2 style={{fontSize:17,margin:"26px 0 12px"}}>가져올 기사 목록 · P1 먼저</h2>
  <div style={{display:"grid",gap:9}}>
   {[...approvedPosts].sort((a,b)=>(a.priority==="P1"?0:1)-(b.priority==="P1"?0:1)||b.date.localeCompare(a.date)).map(article=>
    <div key={article.slug} style={{border:"1px solid #e3dedb",padding:"12px 16px",background:"white",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
     <div><span style={{fontWeight:800,color:"#a13440",fontSize:11}}>{article.priority} · {"category" in article&&article.category?article.category:"beauty"}</span><div style={{fontSize:14,fontWeight:700}}>{article.title}</div><a href={"/article/"+article.slug} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>웹사이트 기사 ↗</a></div>
     <span style={{fontSize:12}}>{existing.includes(article.slug)?"Sanity 등록 확인":"가져오기 대상"}</span>
    </div>)}
  </div>
  <p style={{fontSize:13,marginTop:24}}>완료 후 왼쪽의 <strong>📰 일반 기사 / Articles</strong> 메뉴에서 수정합니다. 이후 본문은 Sanity의 <strong>최종 원고 / Русский Markdown</strong> 필드가 우선 적용됩니다.</p>
 </div>;
}

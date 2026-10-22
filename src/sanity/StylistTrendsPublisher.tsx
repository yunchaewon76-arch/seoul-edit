"use client";

import {useCallback,useEffect,useMemo,useState} from "react";
import {useClient} from "sanity";
import videos from "../data/creator-videos.json";

const slug="stylist-unnie-fw-trends-2026";
const article=videos.find(video=>video.slug===slug);
type VideoRecord={_id:string;_rev:string;youtubeId?:string;headline?:string;editorialStatus?:string};
const query='*[_type=="creatorVideo" && slug.current==$slug]{_id,_rev,youtubeId,headline,editorialStatus}';

export default function StylistTrendsPublisher(){
 const base=useClient({apiVersion:"2026-10-01"});
 const client=useMemo(()=>base.withConfig({perspective:"raw"}),[base]);
 const [documents,setDocuments]=useState<VideoRecord[]>([]);
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");

 const refresh=useCallback(async()=>{
  const found=await client.fetch<VideoRecord[]>(query,{slug});
  const docs=Array.isArray(found)?found:[];
  setDocuments(docs);
  return docs;
 },[client]);

 useEffect(()=>{
  let active=true;
  refresh().catch(e=>{if(active)setError("Sanity 문서 확인 실패: "+String(e))})
   .finally(()=>{if(active)setLoading(false)});
  return ()=>{active=false};
 },[refresh]);

 async function publishUpdatedArticle(){
  if(!article||busy)return;
  setBusy(true);setError("");setMessage("");
  try{
   const docs=await refresh();
   if(docs.some(doc=>doc.youtubeId&&doc.youtubeId!==article.youtubeId)){
    throw new Error("같은 URL에 다른 YouTube ID를 가진 문서가 있습니다. 자동 덮어쓰기를 중단했습니다.");
   }
   const live=docs.filter(doc=>!doc._id.startsWith("drafts."));
   const drafts=docs.filter(doc=>doc._id.startsWith("drafts."));
   if(live.length>1||drafts.length>1){
    throw new Error("같은 URL의 Sanity 문서가 여러 개 있습니다. 중복 문서를 정리해야 합니다.");
   }
   const id=live[0]?._id||drafts[0]?._id.slice("drafts.".length)||"seoul-edit-video-"+slug;
   const fields={
    headline:article.headline,
    slug:{_type:"slug",current:slug},
    youtubeId:article.youtubeId,
    originalTitle:article.originalTitle,
    creator:article.creator,
    category:article.category,
    reviewStatus:article.reviewStatus,
    editorialStatus:"published",
    publishedAt:article.publishedAt,
    deck:article.deck,
    takeaways:article.takeaways,
    sourceNote:article.sourceNote,
    sourceUrl:article.sourceUrl
   };

   // Create only when no matching published document exists. Never replace unrelated fields.
   await client.createIfNotExists({_id:id,_type:"creatorVideo",...fields});
   let transaction=client.transaction().patch(id,patch=>patch.set(fields));
   for(const doc of drafts){
    transaction=transaction.patch(doc._id,patch=>patch.set(fields));
   }
   await transaction.commit();
   await refresh();
   setMessage("Sanity의 발행 문서와 해당 초안에 최신 원고를 반영했습니다. 운영 사이트에서 실제 제목과 본문을 확인하세요.");
  }catch(e){
   setError("Sanity 반영 실패: "+(e instanceof Error?e.message:String(e))+". 로그인 및 쓰기 권한을 확인하세요.");
  }finally{setBusy(false);}
 }

 return <div style={{maxWidth:970,margin:"0 auto",padding:"clamp(20px,4vw,44px)",fontFamily:"system-ui,sans-serif",lineHeight:1.7}}>
  <span style={{fontSize:12,fontWeight:800,letterSpacing:".14em",color:"#b82e36"}}>SEOUL EDIT / EDITORIAL CONTENT SYNC</span>
  <h1 style={{fontSize:"clamp(26px,3.5vw,39px)",lineHeight:1.2}}>Stylist Unnie 2026 FW 원고 동기화</h1>
  <p>Vercel 운영 사이트에 게시된 <strong>«{article?.headline}»</strong> 상세 원고를 Sanity Studio에도 동일하게 저장합니다.</p>
  <p>대상 URL: <a target="_blank" rel="noopener noreferrer" href={"/video/"+slug}>/video/{slug} ↗</a></p>
  <p>영상 ID: <strong>{article?.youtubeId}</strong> · 원고 섹션/문단: <strong>{article?.takeaways.length??0}개</strong></p>
  <div style={{background:"#f5f3ef",padding:"17px 22px",borderLeft:"4px solid #b82e36"}}>
   <strong>실제 Sanity 발행 문서를 변경하는 작업입니다</strong>
   <p>아래 버튼을 누르면 이 영상의 러시아어 제목·요약·상세 원고와 검증 메모를 Sanity에 쓰고 사이트에 노출되는 발행 상태로 설정합니다. 같은 URL의 기존 문서가 있다면 <strong>제목과 원고 필드만 갱신</strong>하고 이미지·기타 데이터는 보존합니다. 되돌리려면 Sanity History 또는 GitHub의 이전 버전을 참고하세요.</p>
  </div>
  <p>기존 Sanity 문서: {loading?"확인 중…":documents.length?documents.map(d=>d._id.startsWith("drafts.")?"초안":"발행본").join(" + "):"없음 — 신규 발행본 생성 가능"}</p>
  <button type="button" disabled={!article||loading||busy} onClick={()=>{void publishUpdatedArticle()}}
   style={{background:loading||busy?"#888":"#171717",border:0,color:"#fff",padding:"13px 20px",fontWeight:750,minHeight:46,cursor:"pointer"}}>
   {busy?"Sanity에 반영 중…":"이 영상의 새 원고를 Sanity에 반영하고 발행"}
  </button>
  {message&&<p role="status" style={{marginTop:18,padding:12,background:"#e5f4e9",color:"#214b32"}}>{message}</p>}
  {error&&<p role="alert" style={{marginTop:18,padding:12,background:"#fdeae8",color:"#93241c"}}>{error}</p>}
  <p style={{fontSize:13,color:"#686868",marginTop:25}}>원고는 현재 GitHub 기본 데이터에 있는 러시아어 버전입니다. Sanity 로그인·쓰기 권한이 없는 경우 이 화면은 CMS를 변경하지 않습니다.</p>
 </div>;
}

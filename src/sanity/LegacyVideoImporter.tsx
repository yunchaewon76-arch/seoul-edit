"use client";

import {useCallback,useEffect,useMemo,useState} from "react";
import {useClient} from "sanity";
import rawVideos from "../data/creator-videos.json";

type LegacyVideo=(typeof rawVideos)[number];
const legacyVideos:LegacyVideo[]=rawVideos;
const slugs=legacyVideos.map(video=>video.slug);
const query='array::unique(*[_type == "creatorVideo" && defined(slug.current) && slug.current in $slugs].slug.current)';

function makeDraft(video:LegacyVideo){
 return {
  _id:"drafts.seoul-edit-video-"+video.slug,
  _type:"creatorVideo" as const,
  headline:video.headline,
  slug:{_type:"slug" as const,current:video.slug},
  youtubeId:video.youtubeId,
  editorialStatus:"draft",
  reviewStatus:video.reviewStatus,
  ...(video.category?{category:video.category}:{}),
  ...(video.originalTitle?{originalTitle:video.originalTitle}:{}),
  ...(video.creator?{creator:video.creator}:{}),
  ...(video.publishedAt?{publishedAt:video.publishedAt}:{}),
  ...(video.sourceUrl?{sourceUrl:video.sourceUrl}:{}),
  deck:video.deck,
  sourceNote:video.sourceNote,
  takeaways:video.takeaways,
  linkedProducts:video.linkedProducts
 };
}

export default function LegacyVideoImporter(){
 const baseClient=useClient({apiVersion:"2026-10-01"});
 const client=useMemo(()=>baseClient.withConfig({perspective:"raw"}),[baseClient]);
 const [existing,setExisting]=useState<string[]>([]);
 const [checking,setChecking]=useState(true);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");

 const refresh=useCallback(async()=>{
  const found=await client.fetch<string[]>(query,{slugs});
  setExisting(Array.isArray(found)?found:[]);
  return Array.isArray(found)?found:[];
 },[client]);

 useEffect(()=>{
  let live=true;
  client.fetch<string[]>(query,{slugs}).then(found=>{
   if(live)setExisting(Array.isArray(found)?found:[]);
  }).catch(err=>{
   if(live)setError("기존 문서 확인 실패: "+(err instanceof Error?err.message:String(err)));
  }).finally(()=>{if(live)setChecking(false);});
  return ()=>{live=false;};
 },[client]);

 const importAsDrafts=async()=>{
  if(busy)return;
  setBusy(true);setError("");setMessage("");
  try{
   // Check immediately before writing so this action remains repeatable.
   const found=new Set(await refresh());
   const remaining=legacyVideos.filter(video=>!found.has(video.slug));
   if(!remaining.length){setMessage("이미 모든 영상이 Sanity에 있어. 기존 문서를 덮어쓰지 않았어.");return;}
   let tx=client.transaction();
   for(const video of remaining)tx=tx.createIfNotExists(makeDraft(video));
   await tx.commit();
   await refresh();
   setMessage(remaining.length+"개를 Sanity 초안으로 가져왔어. 기존 "+found.size+"개는 그대로 유지했어. 자동으로 발행하지 않았어.");
  }catch(err){
   setError("가져오기 실패: "+(err instanceof Error?err.message:String(err))+". 로그인/쓰기 권한과 데이터셋을 확인해줘.");
  }finally{setBusy(false);}
 };

 return <div style={{maxWidth:1000,margin:"0 auto",padding:"clamp(20px,4vw,48px)",fontFamily:"system-ui, sans-serif",lineHeight:1.6}}>
  <div style={{fontSize:12,color:"#a13440",fontWeight:800,letterSpacing:".12em"}}>SEOUL EDIT · EDITORIAL DATA MIGRATION</div>
  <h1 style={{fontSize:"clamp(25px,3vw,39px)",lineHeight:1.2,margin:"13px 0"}}>기존 CREATOR WATCH 영상 가져오기</h1>
  <p style={{fontSize:15,maxWidth:760}}>
   GitHub에서 관리하던 영상 <strong>{legacyVideos.length}개</strong>를 Sanity의 <strong>초안(Draft)</strong>으로 옮겨.
   이 작업은 원본 데이터를 지우지 않고, 이미 존재하는 같은 URL의 문서는 건너뛰어.
  </p>
  <div style={{background:"#f8eee9",borderLeft:"4px solid #a13440",padding:"14px 20px",margin:"20px 0"}}>
   <strong>주의 · 자동 발행 없음</strong>
   <p style={{margin:"8px 0 0",fontSize:13}}>영상 8개 중 하나는 원본 검증 대기 중이야. 모든 문서를 <strong>editorialStatus: draft</strong>로 가져오며,
   영상 속 제품이나 러시아 구매 링크는 가져오지 않아. 발행 전에 제목·출처·실제 내용 검수를 마쳐줘.</p>
  </div>
  <div style={{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",padding:"12px 0 23px"}}>
   <button type="button" disabled={busy||checking||existing.length===legacyVideos.length} onClick={()=>{void importAsDrafts();}}
    style={{padding:"12px 19px",background:busy||checking||existing.length===legacyVideos.length?"#96918f":"#202020",color:"white",border:"none",fontSize:14,fontWeight:750,cursor:busy||checking||existing.length===legacyVideos.length?"default":"pointer",minHeight:46}}>
    {checking?"기존 문서 확인 중…":busy?"가져오는 중…":existing.length===legacyVideos.length?"8개 모두 확인됨":"미등록 영상 초안으로 가져오기"}
   </button>
   <span style={{fontSize:13,color:"#6f6460"}}>Sanity에 확인된 영상: {checking?"확인 중":existing.length+" / "+legacyVideos.length}</span>
  </div>
  {message&&<p role="status" style={{padding:15,background:"#ebf6ef",border:"1px solid #acd6b7",color:"#214b32"}}>{message}</p>}
  {error&&<p role="alert" style={{padding:15,background:"#fff0ee",border:"1px solid #d7a49d",color:"#963a33"}}>{error}</p>}
  <h2 style={{fontSize:17,margin:"28px 0 14px"}}>가져올 영상 목록</h2>
  <div style={{display:"grid",gap:9}}>
   {legacyVideos.map((video,index)=><div key={video.slug} style={{background:"white",border:"1px solid #e3dedb",padding:"14px 17px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:15,flexWrap:"wrap"}}>
    <div style={{maxWidth:720}}>
     <div style={{fontSize:11,color:"#a13440",fontWeight:800}}>
      {String(index+1).padStart(2,"0")} / {video.category||"미분류"} · {video.reviewStatus==="pending"?"원본 미확인":"메타데이터 일부 확인"}
     </div>
     <div style={{fontSize:14,fontWeight:750,margin:"5px 0"}}>{video.headline}</div>
     <a href={"https://www.youtube.com/watch?v="+video.youtubeId} target="_blank" rel="noopener noreferrer" style={{color:"#6a605e",fontSize:12,textDecoration:"underline"}}>유튜브 원본 ↗</a>
    </div>
    <span style={{fontSize:12,background:existing.includes(video.slug)?"#e8f4ea":"#f3efec",padding:"7px 11px",fontWeight:700}}>
     {existing.includes(video.slug)?"Sanity에 있음":"초안 가져오기 대상"}
    </span>
   </div>)}
  </div>
  <p style={{fontSize:13,marginTop:27,color:"#695d59"}}>
   완료 후 왼쪽의 <strong>🎬 CREATOR WATCH / Videos</strong> 메뉴에서 초안으로 생성된 문서를 열어 수정해.
   실제 사이트에 공개하려면 원본 검수 후 <strong>발행 승인</strong>을 설정하고 Sanity <strong>Publish</strong>도 눌러야 해.
  </p>
 </div>;
}

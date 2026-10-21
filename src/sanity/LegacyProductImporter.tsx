"use client";

import {useCallback,useEffect,useMemo,useState} from "react";
import {useClient} from "sanity";
import seed from "../data/verified-video-products.json";

type SeedProduct={
 id:string;videoSlug:string;brand:string;name:string;variant?:string;
 originalOrAlternative:"original"|"alternative";alternativeFor?:string;
 whyComparable?:string;comparisonSourceUrl?:string;russianRetailer?:string;
 russianProductUrl?:string;checkedAt?:string;verificationNote:string;
};
const products:SeedProduct[]=seed as SeedProduct[];
const ids=products.map(p=>p.id);
const slugs=[...new Set(products.map(p=>p.videoSlug))];
type VideoDocument={_id:string;slug:string};
type ExistingProduct={_id:string;sourceId?:string};

export default function LegacyProductImporter(){
 const baseClient=useClient({apiVersion:"2026-10-01"});
 const client=useMemo(()=>baseClient.withConfig({perspective:"raw"}),[baseClient]);
 const [existing,setExisting]=useState<string[]>([]);
 const [videos,setVideos]=useState<VideoDocument[]>([]);
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [error,setError]=useState("");

 const refresh=useCallback(async()=>{
  const [found,videoDocs]=await Promise.all([
   client.fetch<ExistingProduct[]>(
    '*[_type=="videoProduct" && (sourceId in $ids || _id in $documentIds)]{_id,sourceId}',
    {ids,documentIds:ids.flatMap(id=>[id,"drafts."+id])}
   ),
   client.fetch<VideoDocument[]>(
    '*[_type=="creatorVideo" && slug.current in $slugs]{"_id":_id,"slug":slug.current}',
    {slugs}
   )
  ]);
  const known=new Set((found||[]).flatMap(row=>[row.sourceId,row._id.replace(/^drafts\./,"")].filter((id):id is string=>!!id)));
  const done=ids.filter(id=>known.has(id));
  setExisting(done);
  setVideos(videoDocs||[]);
  return {done,videoDocs:videoDocs||[]};
 },[client]);

 useEffect(()=>{
  let mounted=true;
  refresh().catch(e=>{if(mounted)setError("CMS 조회 실패: "+String(e));})
   .finally(()=>{if(mounted)setLoading(false);});
  return ()=>{mounted=false};
 },[refresh]);

 const importDrafts=async()=>{
  if(busy)return;
  setBusy(true);setNotice("");setError("");
  try{
   const {done,videoDocs}=await refresh();
   const present=new Set(done);
   const missing=products.filter(p=>!present.has(p.id));
   const targets=new Map<string,string>();
   for(const doc of videoDocs){
    const stable=doc._id.replace(/^drafts\./,"");
    if(!targets.has(doc.slug)||!doc._id.startsWith("drafts."))targets.set(doc.slug,stable);
   }
   const blocked=missing.filter(p=>!targets.has(p.videoSlug));
   if(blocked.length){
    throw new Error("출처 영상이 Sanity에 등록되지 않았습니다. 먼저 '기존 영상 8개 가져오기'에서 영상을 초안으로 등록하세요.");
   }
   if(!missing.length){setNotice("이미 모든 제품이 등록되어 있어 기존 문서를 수정하지 않았습니다.");return;}
   let tx=client.transaction();
   for(const p of missing){
    const {id,videoSlug,...fields}=p;
    tx=tx.createIfNotExists({
     _id:"drafts."+id,_type:"videoProduct",
     sourceId:id,
     video:{_type:"reference",_ref:targets.get(videoSlug),_weak:true},
     ...fields,
     editorialStatus:"research"
    });
   }
   await tx.commit();
   await refresh();
   setNotice(missing.length+"개를 조사 중인 초안으로 가져왔습니다. 기존 상품과 GitHub 데이터를 덮어쓰거나 사이트에 자동 게시하지 않았습니다.");
  }catch(e){setError("가져오기 실패: "+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 };

 return <div style={{maxWidth:980,margin:"0 auto",padding:"clamp(20px,4vw,48px)",fontFamily:"system-ui,sans-serif",lineHeight:1.65}}>
  <span style={{fontSize:12,color:"#a13440",fontWeight:800,letterSpacing:".1em"}}>SEOUL EDIT · CMS CONTENT MIGRATION</span>
  <h1>기존 영상 제품을 Sanity로 가져오기</h1>
  <p>GitHub에서 공개 중인 <strong>{products.length}개 제품</strong>을 Sanity의 편집 가능한 초안으로 복사합니다. 이미 등록된 동일 sourceId는 건너뜁니다.</p>
  <div style={{background:"#f8eee9",padding:18,borderLeft:"4px solid #a13440"}}>
   <strong>검수·발행은 자동으로 하지 않습니다</strong>
   <p>제품 카드의 원본 확인, 러시아 판매처, 정확한 색상과 이미지 사용 권한을 검토한 뒤 해당 제품의 상태를 <code>published</code>로 바꾸고 Sanity <strong>Publish</strong>를 선택해야 Vercel 사이트에 반영됩니다. 업로드는 조사 초안만 만듭니다.</p>
   <p>GitHub 코드 변경은 기존과 같이 Vercel에 자동 배포되지만, Sanity에서 수정한 콘텐츠는 GitHub JSON으로 자동 복사되지 않습니다.</p>
  </div>
  <p><a href="/studio/structure/creator-video-import">① 먼저 기존 영상 8개를 가져오기 ↗</a></p>
  <p><a href="/video/taengkodok-ep03-taeyeon-eunchae" target="_blank" rel="noopener noreferrer">현재 Vercel 운영 기사 확인 ↗</a></p>
  <button type="button" onClick={()=>{void importDrafts()}} disabled={busy||loading||existing.length===products.length}
   style={{border:0,background:busy||loading?"#999":"#202020",padding:"13px 20px",color:"white",cursor:"pointer",fontWeight:700,minHeight:44}}>
   {loading?"현재 Sanity 문서 확인 중…":busy?"제품 가져오는 중…":existing.length===products.length?"모든 제품 등록 완료":"미등록 제품을 Sanity 초안으로 가져오기"}
  </button>
  <p>Sanity 등록 제품: <strong>{existing.length} / {products.length}</strong> · 출처 영상 확인: {videos.length?"확인됨":"영상 가져오기 필요"}</p>
  {notice&&<p role="status" style={{color:"#185d31"}}>{notice}</p>}
  {error&&<p role="alert" style={{color:"#a13440"}}>{error}</p>}
  <h2>가져올 항목</h2>
  <ul>{products.map(p=><li key={p.id}>{p.brand} · {p.name}{p.variant?" · "+p.variant:""} — {existing.includes(p.id)?"Sanity 등록 확인":"초안 가져오기 대상"}</li>)}</ul>
 </div>;
}

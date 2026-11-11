"use client";
import {useEffect,useState} from "react";
import {copyReviewStatus} from "@/data/copy-review-status-20261111";
type Choice="pending"|"approved"|"revision";
type RecordValue={choice:Choice;note:string;updated:string};
const KEY="seoul-edit-editorial-review-20261111";

export default function ReviewActions({slug,title}:{slug:string;title:string}) {
 const [choice,setChoice]=useState<Choice>(copyReviewStatus[slug]||"pending");
 const [note,setNote]=useState("");
 const [saved,setSaved]=useState((copyReviewStatus[slug]||"pending")!=="pending");
 const [copied,setCopied]=useState(false);
 useEffect(()=>{
   try {const all=JSON.parse(localStorage.getItem(KEY)||"{}");const item=all[slug] as RecordValue|undefined;
   if(item){setChoice(item.choice);setNote(item.note||"");setSaved(true)} } catch{}
 },[slug]);
 function save(next:Choice){
   setChoice(next);
   try {const all=JSON.parse(localStorage.getItem(KEY)||"{}");
   all[slug]={choice:next,note,updated:new Date().toISOString()};
   localStorage.setItem(KEY,JSON.stringify(all));setSaved(true); } catch{setSaved(false)}
 }
 async function copy(){
   const payload=["SEOUL EDIT 검수 결과","기사: "+title,"Slug: "+slug,"결정: "+(choice==="approved"?"검수 완료":choice==="revision"?"수정 요청":"미검수"),"의견: "+(note||"(없음)")].join("\n");
   try{await navigator.clipboard.writeText(payload);setCopied(true)}catch{setCopied(false)}
 }
 return <section aria-label="Editorial review actions" style={{padding:"26px",border:"1px solid #cad7cf",background:"#f7faf7",margin:"55px 0",borderRadius:4}}>
   <p style={{color:"#6a7e70",fontSize:11,letterSpacing:".12em",fontWeight:700,margin:0}}>EDITORIAL DESK · REVIEW ONLY</p>
   <h2 style={{fontFamily:"Georgia,serif",fontSize:29,fontWeight:400,margin:"10px 0"}}>검수 결정</h2>
   <p style={{fontSize:14,lineHeight:1.6,color:"#65776b"}}>여기서 선택한 결정은 이 브라우저에만 임시 저장됩니다. 실제 Notion 게시승인이나 홈페이지 공개로 연결되지 않습니다.</p>
   <label htmlFor={"review-note-"+slug} style={{display:"block",fontSize:13,fontWeight:600,marginBottom:8}}>수정 의견</label>
   <textarea id={"review-note-"+slug} value={note} onChange={e=>{setNote(e.target.value);setSaved(false)}} placeholder="고쳐야 할 부분을 적어주세요." rows={3} style={{width:"100%",padding:12,border:"1px solid #c8d5ca",background:"white",fontFamily:"inherit",fontSize:14,borderRadius:3}}/>
   <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:16}}>
     <button onClick={()=>save("approved")} type="button" style={{padding:"12px 20px",color:"#fff",background:choice==="approved"?"#24664c":"#345c4b",border:0,cursor:"pointer",borderRadius:3}}>✓ 검수 완료</button>
     <button onClick={()=>save("revision")} type="button" style={{padding:"12px 20px",color:"#3a4a41",background:"#fff",border:"1px solid #bfcfc4",cursor:"pointer",borderRadius:3}}>수정 요청</button>
     <button onClick={copy} type="button" disabled={!saved} style={{padding:"12px 20px",color:"#345c4b",background:"transparent",border:"1px solid #bfcfc4",cursor:saved?"pointer":"not-allowed",borderRadius:3}}>결정 내용 복사</button>
   </div>
   <small style={{display:"block",marginTop:14,color:"#708377"}}>{copied?"결정이 복사되었습니다. 대화창에 붙여 넣으면 승인 절차를 이어갈 수 있습니다.":saved?"이 브라우저에 결정이 임시 저장되었습니다.":"버튼을 눌러 검수 결정을 남겨주세요."}</small>
 </section>;
}

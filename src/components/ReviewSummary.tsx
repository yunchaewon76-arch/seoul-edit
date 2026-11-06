"use client";
import {useEffect,useState} from "react";
type Entry={slug:string,title:string};
type Review={choice:"pending"|"approved"|"revision";note?:string;updated?:string};
const KEY="seoul-edit-editorial-review-20261106";

export default function ReviewSummary({articles}:{articles:Entry[]}){
 const [items,setItems]=useState<Record<string,Review>>({});
 const [copyLabel,setCopyLabel]=useState("전체 검수 결과 복사");
 useEffect(()=>{
  function refresh(){try{setItems(JSON.parse(localStorage.getItem(KEY)||"{}"))}catch{setItems({})}}
  refresh();window.addEventListener("focus",refresh);window.addEventListener("storage",refresh);
  return()=>{window.removeEventListener("focus",refresh);window.removeEventListener("storage",refresh)};
 },[]);
 const approved=articles.filter(a=>items[a.slug]?.choice==="approved").length;
 const revision=articles.filter(a=>items[a.slug]?.choice==="revision").length;
 async function copy(){
  const lines=["SEOUL EDIT · 검수 결과 · 2026-11-06","전체 "+articles.length+"편 / 완료 "+approved+"편 / 수정 요청 "+revision+"편",
    ...articles.map((a,i)=>String(i+1).padStart(2,"0")+". "+a.title+"\n상태: "+(items[a.slug]?.choice==="approved"?"검수 완료":items[a.slug]?.choice==="revision"?"수정 요청":"미검수")+"\nSlug: "+a.slug+"\n의견: "+(items[a.slug]?.note||"-")),
   "※ 웹사이트 실제 게시 승인은 이 요약을 검토한 후 별도로 수행"];
  try{await navigator.clipboard.writeText(lines.join("\n\n"));setCopyLabel("복사됨 · 채팅에 붙여 넣으세요")}catch{setCopyLabel("복사 실패 · 브라우저 권한을 확인하세요")}
 }
 return <section style={{background:"#f1f6f2",border:"1px solid #d3e1d6",padding:"22px",margin:"18px 0 42px",borderRadius:5}}>
  <div style={{display:"flex",flexWrap:"wrap",gap:20,justifyContent:"space-between",alignItems:"center"}}>
   <div><strong style={{fontSize:19,color:"#2e5842"}}>검수 진행 현황</strong><p style={{margin:"9px 0 0",fontSize:13,color:"#62796b"}}>완료 {approved} · 수정 요청 {revision} · 미검수 {articles.length-approved-revision}</p></div>
   <button onClick={copy} type="button" style={{background:"#2c6045",color:"white",border:0,borderRadius:4,padding:"13px 18px",cursor:"pointer"}}>{copyLabel}</button>
  </div>
  <div style={{height:7,background:"#d9e3dc",borderRadius:7,marginTop:20,overflow:"hidden"}}><div style={{height:"100%",width:(100*(approved+revision)/Math.max(articles.length,1))+"%",background:"#508a69",transition:"width .2s"}}/></div>
  <small style={{display:"block",marginTop:12,fontSize:11,color:"#79877e"}}>현재는 브라우저별 검수 기록입니다. 완료 후 ‘전체 검수 결과 복사’를 눌러 대화창에 붙여 넣어 주세요. 자동 공개 게시하지 않습니다.</small>
 </section>;
}

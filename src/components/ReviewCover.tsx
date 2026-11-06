"use client";
import {useState} from "react";
export default function ReviewCover({slug,title,category,thumbnail=false}:{slug:string;title:string;category:string;thumbnail?:boolean}){
 const [missing,setMissing]=useState(false);
 const wide="/editorial/covers/"+slug+"-16x9.jpg";
 const portrait="/editorial/covers/"+slug+"-4x5.jpg";
 const wrap:React.CSSProperties={width:"100%",height:"100%",position:"relative",display:"block",overflow:"hidden",background:"linear-gradient(128deg,#e1e6de,#c5cfbf 55%,#e9ddd1)"};
 const img:React.CSSProperties={width:"100%",height:"100%",objectFit:"cover",display:"block"};
 return <div style={wrap}>
  {!missing?<picture style={{display:"block",width:"100%",height:"100%"}}>
    {!thumbnail&&<source media="(max-width:760px)" srcSet={portrait}/>}
    <img src={wide} alt={"AI 콘셉트 표지: "+title} style={img} loading={thumbnail?"lazy":"eager"} onError={()=>setMissing(true)}/>
  </picture>:<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"end",padding:thumbnail?12:28,boxSizing:"border-box",background:"linear-gradient(150deg,#f2ede5,#cad7cc)",color:"#3d5848"}}>
    <small style={{fontSize:thumbnail?9:11,letterSpacing:".10em"}}>SEOUL EDIT · COVER IN REVIEW</small>
    <strong style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:thumbnail?18:45}}>{category}</strong>
  </div>}
 </div>;
}

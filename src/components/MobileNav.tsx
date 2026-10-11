"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
type Icon="home"|"signal"|"beauty"|"fashion"|"ask";
const tabs:{href:string;label:string;icon:Icon}[]=[
 {href:"/",label:"Главная",icon:"home"},
 {href:"/signal",label:"SIGNAL",icon:"signal"},
 {href:"/beauty",label:"Красота",icon:"beauty"},
 {href:"/fashion",label:"Мода",icon:"fashion"},
 {href:"/ask",label:"ASK",icon:"ask"}
];
function IconGlyph({icon}:{icon:Icon}){
 return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  {icon==="home"&&<><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-8h6v8"/></>}
  {icon==="signal"&&<><circle cx="12" cy="12" r="2"/><path d="M7 7a7 7 0 0 1 10 0M7 17a7 7 0 0 0 10 0"/><path d="M4 4a11 11 0 0 1 16 0M4 20a11 11 0 0 0 16 0"/></>}
  {icon==="beauty"&&<><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>}
  {icon==="fashion"&&<><path d="M9 5.5a3 3 0 0 1 6 0c0 1.5-1.5 2-3 3v2"/><path d="m12 10.5 9 7a2 2 0 0 1-1.2 3.5H4.2A2 2 0 0 1 3 17.5l9-7Z"/></>}
  {icon==="ask"&&<><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.9.7-1.5 1.2-1.5 2.5"/><path d="M12 17h.01"/></>}
 </svg>;
}
export default function MobileNav(){
 const path=usePathname();
 return <nav className="mobile-bottom-nav" aria-label="Мобильная навигация">
  <div className="mobile-bottom-inner">{tabs.map(tab=>{
   const active=path===tab.href;
   return <Link key={tab.href} href={tab.href} aria-current={active?"page":undefined} className={"mobile-tab"+(active?" is-active":"")+(tab.icon==="signal"?" mobile-tab--signal":"")}>
    <IconGlyph icon={tab.icon}/><span>{tab.label}</span>
   </Link>;
  })}</div>
 </nav>;
}

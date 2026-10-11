import type {Metadata} from "next";
import Link from "next/link";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"SEOUL EDIT · Editorial Studio",robots:{index:false,follow:false}};

export default async function StudioPage(){
 const configured=Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()&&process.env.NEXT_PUBLIC_SANITY_DATASET?.trim());
 if(!configured){
  return <div className="sanity-embed-page sanity-setup-page"><div className="sanity-setup-inner">
   <span>SEOUL EDIT / CONTENT MANAGEMENT</span>
   <h1>Sanity Studio 준비 중</h1>
   <p>관리자 화면 코드와 기사·영상·제품 스키마는 준비됐어. 실제 Sanity 프로젝트에 연결하려면 Project ID와 Dataset 이름을 Vercel 환경변수에 등록해야 해.</p>
   <p><strong>NEXT_PUBLIC_SANITY_PROJECT_ID</strong> · <strong>NEXT_PUBLIC_SANITY_DATASET</strong></p>
   <p>Sanity 계정 인증과 접근 권한은 Sanity에서 관리해. 이 화면에서 개인 비밀번호나 토큰을 입력할 필요는 없어.</p>
   <div className="sanity-setup-actions">
    <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer">Sanity 프로젝트 확인 ↗</a>
    <Link href="/">매거진으로 돌아가기 ↗</Link>
   </div>
  </div></div>;
 }
 const {default:SanityStudioClient}=await import("@/components/SanityStudioClient");
 return <div className="sanity-embed-page"><SanityStudioClient/></div>;
}

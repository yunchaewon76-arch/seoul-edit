import {NextResponse} from "next/server";
import {cmsClient} from "@/sanity/client";

export const dynamic="force-dynamic";
export const revalidate=0;

/** Public-data health check; reports no drafts, credentials, titles or content. */
export async function GET(){
 if(!cmsClient)return NextResponse.json({configured:false,connected:false,reason:"missing-env"},{status:503,headers:{"Cache-Control":"no-store"}});
 try{
  const result=await cmsClient.fetch<{publishedCount:number;targetCount:number;paragraphCount:number;imageCount:number}>(
   '{"publishedCount":count(*[_type=="creatorVideo" && !(_id in path("drafts.**"))]),'
    +'"targetCount":count(*[_type=="creatorVideo" && slug.current=="stylist-unnie-fw-trends-2026"]),'
    +'"paragraphCount":count(*[_type=="creatorVideo" && slug.current=="stylist-unnie-fw-trends-2026"][0].takeaways[]),'
    +'"imageCount":count(*[_type=="creatorVideo" && slug.current=="stylist-unnie-fw-trends-2026"][0].editorialImages[])}',
   {},{cache:"no-store"}
  );
  return NextResponse.json({configured:true,connected:true,...result},{headers:{"Cache-Control":"no-store"}});
 }catch(error){
  const status=typeof error==="object"&&error!==null&&"statusCode" in error?Number(error.statusCode):0;
  return NextResponse.json({
    configured:true,connected:false,
    reason:status===401||status===403?"dataset-read-access":status===404?"dataset-not-found":"sanity-query-failed",
    upstreamStatus:status||null
  },{status:503,headers:{"Cache-Control":"no-store"}});
 }
}

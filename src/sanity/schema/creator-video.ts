import {defineField,defineType} from "sanity";
export const creatorVideo=defineType({
 name:"creatorVideo",title:"🎬 CREATOR WATCH 영상",type:"document",
 fields:[
  defineField({name:"headline",title:"러시아어 기사 제목",type:"string",validation:R=>R.required()}),
  defineField({name:"slug",title:"기사 URL",type:"slug",options:{source:"headline",maxLength:95},validation:R=>R.required()}),
  defineField({name:"youtubeId",title:"YouTube ID (11자)",type:"string",validation:R=>R.required().regex(/^[\w-]{11}$/, {name:"YouTube ID"})}),
  defineField({name:"editorialStatus",title:"기사 승인",type:"string",initialValue:"draft",options:{list:[
   {title:"초안",value:"draft"},{title:"검수 중",value:"review"},{title:"발행 승인",value:"published"}
  ],layout:"radio"},validation:R=>R.required()}),
  defineField({name:"reviewStatus",title:"원본 확인",type:"string",initialValue:"pending",options:{list:[
   {title:"원본 검증 대기",value:"pending"},{title:"원본 식별",value:"identified"}
  ]},validation:R=>R.required()}),
  defineField({name:"category",title:"Beauty / Fashion / Trends",type:"string",options:{list:[
   {title:"Красота",value:"beauty"},{title:"Мода",value:"fashion"},{title:"Тренды",value:"trends"}
  ]},description:"영상 주제 확인 전에는 비워두세요."}),
  defineField({name:"originalTitle",title:"한국어 원본 제목",type:"string"}),
  defineField({name:"creator",title:"유튜버/채널",type:"string"}),
  defineField({name:"publishedAt",title:"유튜브 공개일",type:"date"}),
  defineField({name:"deck",title:"러시아어 요약",type:"text",rows:4,validation:R=>R.required()}),
  defineField({name:"takeaways",title:"확인된 해설 문단",type:"array",of:[{type:"text",rows:4}]}),
  defineField({name:"sourceUrl",title:"메타데이터 확인 출처",type:"url"}),
  defineField({name:"sourceNote",title:"검증 완료/미완료 메모",type:"text",rows:4,validation:R=>R.required()}),
  defineField({name:"linkedProducts",title:"제품 연결 (운영 메모)",type:"array",of:[{type:"string"}],description:"상세 제품은 제품 관리 문서에서 연결하세요."})
 ],
 preview:{select:{title:"headline",subtitle:"editorialStatus"}}
});

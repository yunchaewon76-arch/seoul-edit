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
  defineField({
   name:"takeaways",
   title:"확인된 해설 문단 / Текст",
   description:"기존 러시아어 문단이 그대로 보관돼. 문단 사이에 이미지를 넣고 싶다면 바로 아래 '기사 중간 이미지'에서 사진을 업로드하고 위치를 선택해.",
   type:"array",
   of:[{type:"text",title:"해설 문단",rows:4}]
  }),
  defineField({
   name:"editorialImages",
   title:"기사 중간 이미지 / Фото",
   description:"사진을 업로드한 후 '몇 번째 문단 뒤'에 넣을지 설정해. 0이면 첫 문단 앞, 1이면 첫 문단 뒤, 2이면 두 번째 문단 뒤야. 사진은 여기서 위아래로 정렬할 수 있어.",
   type:"array",
   of:[{
    type:"image",title:"기사 이미지",
    options:{hotspot:true},
    fields:[
     defineField({name:"afterParagraph",title:"몇 번째 문단 뒤에 삽입? (0 = 본문 맨 앞)",type:"number",
      initialValue:1,validation:R=>R.required().integer().min(0)}),
     defineField({name:"alt",title:"이미지 접근성 설명 (러시아어)",type:"string",validation:R=>R.required()}),
     defineField({name:"caption",title:"사진 설명 (러시아어)",type:"string",validation:R=>R.required()}),
     defineField({name:"credit",title:"사진 출처 · 크레딧",type:"string",validation:R=>R.required()}),
     defineField({name:"rightsConfirmed",title:"이미지 사용 권한 확인",type:"boolean",
      description:"직접 소유하거나 사용 허가를 받은 사진만 올려줘. 유튜브 영상 스크린샷이나 브랜드 공식 사진도 별도 허가가 필요할 수 있어.",
      initialValue:false,
      validation:R=>R.custom(v=>v===true?true:"사진 사용 권한을 확인해야 해.")})
    ],
    preview:{select:{media:"asset",title:"caption",subtitle:"credit"}}
   }]
  }),
  defineField({name:"sourceUrl",title:"메타데이터 확인 출처",type:"url"}),
  defineField({name:"sourceNote",title:"검증 완료/미완료 메모",type:"text",rows:4,validation:R=>R.required()}),
  defineField({name:"linkedProducts",title:"제품 연결 (운영 메모)",type:"array",of:[{type:"string"}],description:"상세 제품은 제품 관리 문서에서 연결하세요."})
 ],
 preview:{select:{title:"headline",subtitle:"editorialStatus"}}
});

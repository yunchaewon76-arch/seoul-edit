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
   title:"확인된 해설 문단 + 이미지",
   description:"문단과 이미지를 원하는 순서로 추가해. 문단 사이에 사진을 넣으려면 아래 + 버튼 → 이미지 / Фото를 선택해. 기존 문단은 유지돼.",
   type:"array",
   of:[
    {type:"text",title:"문단 / Текст",rows:4},
    {
     type:"image",title:"이미지 / Фото",
     options:{hotspot:true},
     fields:[
      defineField({name:"alt",title:"이미지 설명 · 접근성 (러시아어)",type:"string",validation:R=>R.required()}),
      defineField({name:"caption",title:"사진 아래 표시할 설명 (러시아어)",type:"string",validation:R=>R.required()}),
      defineField({name:"credit",title:"사진 출처 · 크레딧",type:"string",validation:R=>R.required()}),
      defineField({name:"rightsConfirmed",title:"이미지 사용 권한 확인",type:"boolean",
       description:"본인 소유 또는 사용 허가를 받은 이미지만 업로드. 유튜브 화면 캡처는 별도 권리를 확인해.",
       initialValue:false,
       validation:R=>R.custom(value=>value===true?true:"사진 사용 권한을 확인해 주세요.")})
     ]
    }
   ]
  }),
  defineField({name:"sourceUrl",title:"메타데이터 확인 출처",type:"url"}),
  defineField({name:"sourceNote",title:"검증 완료/미완료 메모",type:"text",rows:4,validation:R=>R.required()}),
  defineField({name:"linkedProducts",title:"제품 연결 (운영 메모)",type:"array",of:[{type:"string"}],description:"상세 제품은 제품 관리 문서에서 연결하세요."})
 ],
 preview:{select:{title:"headline",subtitle:"editorialStatus"}}
});

import {defineField,defineType} from "sanity";

export const editorialArticle=defineType({
 name:"editorialArticle",title:"📰 매거진 기사 / Статья",type:"document",
 fields:[
  defineField({name:"title",type:"string",title:"러시아어 제목",validation:R=>R.required().min(12)}),
  defineField({name:"slug",type:"slug",title:"URL 주소",options:{source:"title",maxLength:96},validation:R=>R.required()}),
  defineField({name:"editorialStatus",type:"string",title:"검수 상태",initialValue:"draft",
   options:{list:[{title:"초안 / Draft",value:"draft"},{title:"검수 중 / Review",value:"review"},{title:"발행 승인 / Published",value:"published"}],layout:"radio"},
   validation:R=>R.required()}),
  defineField({name:"category",type:"string",title:"카테고리",options:{list:[{title:"Красота / 뷰티",value:"beauty"},{title:"Мода / 패션",value:"fashion"},{title:"Тренды / 트렌드",value:"trends"}]},validation:R=>R.required()}),
  defineField({name:"format",type:"string",title:"기사 형식",initialValue:"editorial",options:{list:[{title:"긴 기사",value:"editorial"},{title:"짧은 브리프",value:"brief"}]}}),
  defineField({name:"publishedAt",type:"date",title:"게시일",validation:R=>R.required()}),
  defineField({name:"excerpt",type:"text",rows:3,title:"요약",validation:R=>R.required().min(40)}),
  defineField({name:"coverImage",type:"image",title:"기사 커버 이미지 · 저작권 확인 필수",options:{hotspot:true},fields:[
    defineField({name:"alt",type:"string",title:"대체 텍스트 / alt",validation:R=>R.required()}),
    defineField({name:"credit",type:"string",title:"촬영자·라이선스 출처"})
  ]}),
  defineField({name:"bodyParagraphs",type:"array",title:"본문 문단 (러시아어)",of:[{type:"text",rows:6}],validation:R=>R.min(1).required()}),
  defineField({name:"signal",type:"text",rows:3,title:"확인된 사실 (SEOUL SIGNAL)",validation:R=>R.required()}),
  defineField({name:"context",type:"text",rows:3,title:"맥락·의미",validation:R=>R.required()}),
  defineField({name:"caution",type:"text",rows:3,title:"해석의 한계",validation:R=>R.required()}),
  defineField({name:"tags",type:"array",title:"태그",of:[{type:"string"}],options:{layout:"tags"}}),
  defineField({name:"readingMinutes",type:"number",title:"예상 읽기 시간(분)",initialValue:4,validation:R=>R.min(1).max(40)}),
  defineField({name:"sources",type:"array",title:"검증한 원문 출처",of:[{type:"object",fields:[
    {name:"title",title:"원문 제목",type:"string",validation:R=>R.required()},
    {name:"url",title:"원문 링크",type:"url",validation:R=>R.required().uri({scheme:["https"]})},
    {name:"kind",title:"출처 유형",type:"string",options:{list:[
     "КОРЕЙСКИЙ ИСТОЧНИК","ИССЛЕДОВАНИЕ","МЕДИЦИНСКИЙ ИСТОЧНИК","ОБЗОР","ОФИЦИАЛЬНЫЙ ИСТОЧНИК"
    ]}}
   ]}],validation:R=>R.required().min(1)})
 ],
 preview:{select:{title:"title",subtitle:"editorialStatus",media:"coverImage"}}
});

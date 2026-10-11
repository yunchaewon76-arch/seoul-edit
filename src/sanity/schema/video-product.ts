import {defineField,defineType} from "sanity";
export const videoProduct=defineType({
 name:"videoProduct",title:"🧴 영상 속 제품·대체품",type:"document",
 fields:[
  defineField({name:"video",title:"출처 영상",type:"reference",to:[{type:"creatorVideo"}],validation:R=>R.required()}),
  defineField({name:"brand",title:"브랜드",type:"string",validation:R=>R.required()}),
  defineField({name:"name",title:"정확한 제품명",type:"string",validation:R=>R.required()}),
  defineField({name:"variant",title:"용량/색상/옵션",type:"string"}),
  defineField({name:"originalOrAlternative",title:"제품 유형",type:"string",options:{list:[
   {title:"영상 속 원제품",value:"original"},{title:"러시아 대체품",value:"alternative"}
  ]},validation:R=>R.required()}),
  defineField({name:"editorialStatus",title:"제품 검증 상태",type:"string",initialValue:"research",options:{list:[
   {title:"조사 중",value:"research"},{title:"원본 확인됨",value:"sourceChecked"},
   {title:"판매처 확인됨 · 발행 승인",value:"published"}
  ]},validation:R=>R.required()}),
  defineField({name:"russianRetailer",title:"러시아 판매처 이름",type:"string"}),
  defineField({name:"russianProductUrl",title:"러시아 상품 상세 URL",type:"url"}),
  defineField({name:"checkedAt",title:"상품 페이지 확인일",type:"date"}),
  defineField({name:"verificationNote",title:"상품 검증 근거·타임코드",type:"text",rows:4,validation:R=>R.required()}),
  defineField({name:"alternativeFor",title:"대체하려는 원제품",type:"string",hidden:({parent})=>parent?.originalOrAlternative!=="alternative"}),
  defineField({name:"whyComparable",title:"대체품의 공통점과 차이점",type:"text",rows:3,hidden:({parent})=>parent?.originalOrAlternative!=="alternative"}),
  defineField({name:"comparisonSourceUrl",title:"대체품 비교 출처",type:"url",hidden:({parent})=>parent?.originalOrAlternative!=="alternative"}),
  defineField({name:"image",title:"권리 확인된 제품 사진만 업로드",type:"image",options:{hotspot:true}})
 ],
 preview:{select:{title:"name",subtitle:"editorialStatus",media:"image"}}
});

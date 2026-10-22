import {defineField,defineType} from "sanity";
export const videoProduct=defineType({
 name:"videoProduct",title:"🧴 영상 속 제품·대체품",type:"document",
 fields:[
  defineField({name:"video",title:"출처 영상",type:"reference",to:[{type:"creatorVideo"}],validation:R=>R.required()}),
  defineField({name:"sourceId",title:"기존 GitHub 상품 ID (중복 방지)",type:"string",readOnly:true}),
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
  defineField({name:"productCategory",title:"이미지 기본 카테고리",type:"string",options:{list:[
   {title:"스킨케어",value:"skincare"},{title:"치크·하이라이터",value:"cheek"},
   {title:"베이스 메이크업",value:"complexion"},{title:"아이 메이크업",value:"eyes"},
   {title:"립 메이크업",value:"lips"},{title:"도구",value:"tools"}
  ]},description:"별도 이미지가 없는 상품의 카테고리 비주얼 선택"}),
  defineField({name:"image",title:"사용 권한 확인 제품 이미지",type:"image",options:{hotspot:true},description:"권리 증빙 완료 전에는 사이트에 표시되지 않습니다."}),
  defineField({name:"imageRightsConfirmed",title:"제품 이미지 사용 권리 확인",type:"boolean",initialValue:false}),
  defineField({name:"imageUsageBasis",title:"제품 이미지 사용 권한 근거",type:"text",rows:2,description:"직접 촬영, 권리자 허가, 라이선스 등 근거"}),
  defineField({name:"imageCredit",title:"제품 이미지 출처·크레딧",type:"string"}),
  defineField({name:"imageAlt",title:"제품 이미지 대체 텍스트 · 러시아어",type:"string"}),
  defineField({name:"editorialImage",title:"SEOUL EDIT 자체 제작 에디토리얼 비주얼",type:"image",options:{hotspot:true},description:"실물 제품 사진이 아니며 일러스트라고 표시됩니다."}),
  defineField({name:"editorialImageAlt",title:"에디토리얼 비주얼 대체 텍스트 · 러시아어",type:"string"}),
  defineField({name:"editorialImagePath",title:"GitHub 저장 에디토리얼 비주얼 경로",type:"string",
   description:"예: /products/editorial/product-id.svg. 실제 저장된 파일만 지정하세요.",
   validation:R=>R.custom(value=>!value||/^\/products\/editorial\/[a-z0-9_-]+\.svg$/.test(value)?true:"허용된 경로 형식이 아닙니다.")})
 ],
 preview:{select:{title:"name",subtitle:"editorialStatus",media:"image"}}
});

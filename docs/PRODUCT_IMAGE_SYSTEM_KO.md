# SEOUL EDIT · 제품 이미지 시스템

## 이미지 표시 우선순위
1. Sanity 제품 이미지 `videoProduct.image`: `imageRightsConfirmed=true` + `imageUsageBasis` + `imageCredit` 3개 모두 기재해야 표시. 외부 일반 URL은 허용하지 않음.
2. SEOUL EDIT 자체 제작 이미지: Sanity `editorialImage` 또는 GitHub의 `/products/editorial/<id>.svg`. 러시아어 "Иллюстрация SEOUL EDIT" 크레딧 노출.
3. 이미지 미등록 제품: 분류별 기본 일러스트 6종. 관리자가 개별 이미지 생성 또는 등록해야 함을 표시. 자동 이미지 생성으로 주장하지 않음.

## 기존 19개 제품
`src/data/verified-video-products.json`의 기존 ID와 이름·색상·판매처·검증 메모는 보존. `scripts/generate-product-artwork.mjs`가 19개 개별 SVG와 6개 카테고리 SVG를 `public/products/`에 생성. `npm run build` 및 `npm run dev` 전 자동 실행. 파일은 독창적 개념 일러스트이며 공식 사진, 실물 용기·로고의 재현이 아님.

## Sanity / GitHub 중복 방지
Sanity의 발행된 `videoProduct`가 상품명, 링크 및 내용의 기준. `sourceId`나 `videoSlug+brand+name+variant`가 GitHub 시드와 일치하면 **누락된 에디토리얼 이미지 경로와 alt만 보완**. 이미 Sanity 이미지가 있으면 그 우선순위를 유지. 수동으로 새로운 제품을 추가하면 자동으로 카테고리 비주얼이 표시됨.

## 운영자 절차
Sanity Studio → 영상 속 제품·대체품 → 제품 선택 → 먼저 실제 이미지의 사용 권리와 출처 조사. 권리 검증된 이미지라면 사진과 권리 근거·크레딧을 등록. 자체 제작 이미지라면 별도 `editorialImage`에 등록. 새 제품의 이미지가 아직 없으면 카테고리를 지정하고 추후 제작이 필요함을 확인. 배포 승인과 제품/기사 공개 승인은 별도.

## 테스트
- 모든 제품 카드에 이미지와 러시아어 alt/크레딧 확인
- 19개 서로 다른 URL 존재, 6개 fallback 정상
- `prebuild`에서 25개 SVG가 생성되어 Vercel 파일에 포함되는지 검사
- 권리 미확인 사진 차단, CMS 사진 > 원본 에디토리얼 > 카테고리 fallback
- 기존 러시아 판매 링크, 제품명, 기사 본문 변경 없음
- 모바일 360/390px 및 데스크톱 1440px 확인
- Production은 Preview 빌드 성공 후 배포. 롤백은 변경 전 정상 Production 배포로 실행

# SEOUL MATCH v0.1 — MVP 개발 및 운영 계획 (2026-10-11)

## 차별화 가설
러시아어 K-beauty 독자가 한국 유행을 자신의 관심사/예산/도시에 대입할 수 있도록 돕는다. 쇼핑몰 카드 모음 대신 "검증된 사실만 안내한다"는 에디토리얼 원칙을 지킨다.

## 현재 구현 (코드 배포)
1. /match 3-step 인터페이스: concern, budget, city.
2. 기본값: Увлажнение, 1 000–3 000 ₽, Москва.
3. 모바일 하단 MATCH 탭, 데스크톱 상단 메뉴, 홈페이지 배너.
4. 제약이 충족될 때만 검증된 상품 결과를 출력하는 규칙 엔진.
5. 검증 상품이 0개인 경우 투명한 빈 상태. 허구의 제품/가격/재고 출력 금지.
6. 상태는 현재 브라우저 메모리만 사용; 계정/개인정보 수집, 외부 추적, AI 진단 없음.

## 데이터 스키마
src/data/match-products.ts 내 VerifiedMarketProduct:
- id, brand, name, kind(original/alternative), concerns
- priceRub, goldenAppleUrl, checkedCity
- productPageCheckedAt, priceCheckedAt (YYYY-MM-DD)
- published:true, editorialReason, sourceUrl
- alternative는 originalProductName, differenceNote 추가

초기 verifiedMarketProducts 배열은 **비어 있음**. 품목/재고/가격을 검증했다고 가정하지 않음.

## 상품 1개 등록 시 수동 검증
1. 한국 신제품/기사 출처 검증 및 브랜드·정확한 SKU·용량 기록.
2. Golden Apple에 해당 **제품 상세 페이지**가 있는지 직접 열어 확인(검색·카테고리 링크 제외).
3. 매장에서 선택한 도시로 설정한 후 가격 확인·날짜 기록. 가격을 못 확인하면 공개 금지.
4. 원제품 및 대체품의 용도/성분/텍스처 등 비교 근거를 공식 정보에서 수집. 대체품은 차이점도 기록.
5. 출처 URL 및 편집자 설명을 포함하고 published:true 승인.
6. 7일이 지나면 가격 및 페이지 검증의 만료로 자동 결과 제외. 재확인하면 날짜 갱신.
7. 실시간 재고/배송 가능성은 기본적으로 미확인. 제품 링크가 있어도 재고 있다고 표시하지 않음.
8. 제휴 링크 사용 시 사용자에게 상업적 관계를 고지.

## 매칭 정책
- 관심사 태그 정확한 일치
- 가격 구간: <1,000 ₽, 1,000–3,000 ₽, >3,000 ₽
- 도시: Moscow/SPB 정확한 확인만; 다른 도시 결과 기본 차단
- https://goldapple.ru 또는 www.goldapple.ru 상세 링크만
- productPageCheckedAt와 priceCheckedAt가 유효하며 최근 7일 이내
- 필수 출처, 편집 근거, 발행 승인
- 모두 만족해야 결과 표시; 조건 불충족 또는 데이터 없음: "검증된 상품 없음"

## UI/UX 테스트
- 선택값 기본값 확인, 다음/이전 이동·값 유지, 재시작
- 예산 1000/3000 경계, 도시 불일치, 7일 초과, 도메인 불일치
- 검증 데이터 0개 시 매칭 카드/가격/재고 주장 0개
- 화면: 320, 375, 390, 768, 1024, 1440px
- 키보드 포커스, ARIA legend/label, 모바일 44px 이상 클릭 영역
- Next.js build + TypeScript + Vercel Production READY

## 제품 데이터 운영 및 CMS 단계
P1: 15~20개 **후보**에 대해 실제 확인된 품목만 등록. 15~20개를 자동 생성하지 않음.
P2: Sanity CMS에 product/trend/source/verification 문서형과 Draft/Review/Publish; 편집 승인만 라이브 출력.
P3: Beauty/Fashion/Trends 60개 콘텐츠에 제품·기사 관계 연결.
P4: 개인정보 정책을 정한 뒤 익명 집계(진입, 설문 완료, 검증 제품 링크 클릭) 실험. MVP 자체에는 analytics 미구현.
P5: 공식 재고 API나 합법적인 데이터 파트너십 확보 시에만 가용 재고/자동 갱신 검토.

## 안전/저작권
- 이미지에 대한 이용 허가가 없는 경우 상품 이미지 게시 금지.
- 의학적 진단·시술·효능 보증 금지.
- 현재 사이트 전체 검색 색인은 DEMO 단계라 차단 유지.
- 재고 추측, 타 웹사이트 약관을 무시한 스크래핑, 보장되지 않는 대체품 추천 금지.

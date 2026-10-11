# SEOUL EDIT — 관리자 운영 가이드 (2026-10-11)

## 지금 어디에서 관리하나요?

**현재 사이트에는 관리자 로그인으로 기사를 발행하는 CMS가 아직 없습니다.**
지금 쓰는 관리자 편집 작업 공간은 **GitHub 저장소**입니다.

- 관리자 프로젝트: https://github.com/yunchaewon76-arch/seoul-edit
- 편집 요청 접수함 (Issues): https://github.com/yunchaewon76-arch/seoul-edit/issues
- 새 요청 작성: https://github.com/yunchaewon76-arch/seoul-edit/issues/new/choose
- CREATOR WATCH 영상 자료(JSON): https://github.com/yunchaewon76-arch/seoul-edit/blob/main/src/data/creator-videos.json
- 영상에서 언급된 상품 **미검증 후보**(JSON): https://github.com/yunchaewon76-arch/seoul-edit/blob/main/src/data/product-mentions.json
- 영상·구매처 **최종 검증 상품**(JSON): https://github.com/yunchaewon76-arch/seoul-edit/blob/main/src/data/verified-video-products.json
- 매거진 본문: https://github.com/yunchaewon76-arch/seoul-edit/blob/main/src/data/articles.ts
- Vercel 배포: https://vercel.com/dio-fc54/seoul-edit-web
- 독자용 사이트: https://seoul-edit-web.vercel.app/video

### 가장 쉬운 방법: 이슈로 편집 요청 → ChatGPT에 검수·반영 요청

1. GitHub 계정으로 로그인합니다.
2. `Issues → New issue`에서 `영상 콘텐츠 제안`, `제품 검증`, `기사 아이디어` 중 하나를 선택합니다.
3. 영상 링크, 확인한 제목, 카테고리, 사실의 근거를 입력하고 `Submit new issue`를 누릅니다.
4. 이 대화에서 “GitHub seoul-edit의 이슈 #번호를 검토하고 러시아어 콘텐츠로 발행해줘”라고 요청합니다.
5. 내가 근거를 확인한 자료를 코드에 저장하고 GitHub `main`에 반영하면 Vercel이 자동 배포됩니다.

**중요**: 이슈는 자동 발행되지 않습니다. ChatGPT가 알아서 백그라운드에서 확인하거나 매일 작업하는 것도 아닙니다.

### GitHub에서 직접 소량의 데이터를 수정하는 경우

1. 위 `src/data/creator-videos.json` 파일에 들어갑니다.
2. 우측 연필 아이콘 `Edit this file`을 누릅니다.
3. 같은 형식으로 객체를 수정합니다. 문자열 따옴표, 쉼표 등 JSON 형식을 지켜야 합니다.
4. `Commit changes`를 누릅니다. `main` 브랜치에 저장하면 Vercel 자동 배포가 시작됩니다.
5. Vercel의 `Deployments`에서 `Ready` 확인 후 실제 기사 확인.

이 방식은 간단하지만 실수 가능성이 있으므로 초안은 **Issue로 제출하고 ChatGPT를 통해 검토 후 발행하는 방식**을 권합니다.

## 콘텐츠 발행 구조

- `src/data/creator-videos.json`: 영상 기본 정보, 한국어 제목, 러시아어 기사 소개, 검증 근거, 카테고리.
- `src/data/product-mentions.json`: **제3자 콘텐츠 목록에서 찾은 후보**. 영상 원본 미확인/러시아 구매처 미확인 표시. 구매 버튼 노출 안 함.
- `src/data/verified-video-products.json`: 영상 원본에서 제품을 확인하고 러시아의 상품 상세 URL까지 검증한 최종 카드만. 현재 비어 있음.
- `src/data/articles.ts`: 일반 해설 기사.
- `src/data/video-stories.ts`와 `src/data/video-products.ts`: 데이터를 읽고 검증하는 코드. 비개발자 편집 대상 아님.

### 검수 단계
`아이디어 → 영상/기사 원문 확인 → 제품 등장 확인 → 러시아 상품 링크 조사 → 러시아어 원고 검수 → 발행 → 링크 재검증`.

게시 전 확인할 것:
- 영상 제작자, 제목, 날짜, 정확한 내용과 타임스탬프
- 원본 URL이 실제 해당 영상에 연결되는지
- 제품 브랜드·색상·용량·변형 모델을 직접 확인했는지
- 대체품이 원제품과 *어떤 점에서 유사하고 다른지*
- 이미지 저작권 및 YouTube 임베드 이용 조건
- 구매 페이지와 재고 여부를 구분했는지
- 광고/제휴 관계가 있으면 명확히 표시했는지

## 공개 설정 주의

**현재 GitHub 저장소는 Public입니다.** Issue, 코드, 초안과 제품 정보는 외부에서 열람할 수 있습니다. 민감한 개인 정보, 계약 정보, 비밀 자료는 올리지 마세요. 비공개 운영이 필요하면 GitHub Settings에서 Private 전환을 검토하세요.

Vercel에 현재 활성화된 Deployment Protection은 별도 설정입니다. GitHub 비공개와 사이트 비공개는 같은 의미가 아닙니다.

## 다음 단계: Sanity CMS

영상/기사가 20~60개로 늘어날 때는 다음을 갖춘 시각적 콘텐츠 관리자 구축을 권장합니다:
- URL 기반 영상 등록
- Beauty/Fashion/Trends 및 게시 상태 선택
- 기사/제품/대체품 관계 설정
- 썸네일과 출처·편집 검수 UI
- Draft → Review → Published 워크플로
- 모바일·태블릿에서도 편집

단, **Sanity 프로젝트와 계정 연결이 아직 없으므로 /studio 관리자 화면은 구현/가동된 상태가 아닙니다.** Sanity 계정과 프로젝트의 생성·접근권한 설정을 거친 뒤 연동할 수 있습니다. 공개 사이트에 자체 제작한 무인증 관리자 화면을 열지 마세요.

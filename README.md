# SEOUL EDIT

러시아어 K-Beauty / K-Fashion 매거진 MVP.

- Next.js App Router + React + TypeScript
- 트렌드 브리프 / 에디토리얼, 뷰티·패션 카테고리, 기사 상세, 검색
- 임시 DEMO 기사 8개 (실제 뉴스 아님)
- 추후 CMS 및 실제 자료 검증 후 공개 가능

## 로컬 실행
```bash
npm install
npm run dev
```

## 콘텐츠 수정
`src/data/articles.ts`의 stories 배열을 수정하면 홈페이지, 카테고리, 검색, 기사 페이지가 업데이트됩니다.

## ChatGPT → GitHub → Vercel
이 저장소가 Vercel 프로젝트에 연결되면 `main` 브랜치의 변경이 자동 배포됩니다. ChatGPT에게 변경을 요청하여 GitHub 커밋을 만들 수 있습니다.

## 공개 전 유의사항
현재 글은 모두 DEMO이며 실제 뉴스나 시장 조사 결과가 아닙니다. 검증된 콘텐츠와 사용권 있는 이미지를 올리기 전까지 검색 엔진 색인은 차단되어 있습니다. GitHub 저장소의 공개 여부와 Vercel 프로젝트 보호 설정은 별도로 관리됩니다.


## 콘텐츠 관리자 (운영자용)

현재 별도의 웹 CMS 로그인 화면은 없습니다. GitHub `Issues`에서 검수 요청을 제출하고, 검토한 자료만 GitHub 코드에 발행합니다.

- [편집 요청 작성](https://github.com/yunchaewon76-arch/seoul-edit/issues/new/choose): 영상 / 제품 검증 / 기사
- [운영 가이드](docs/CONTENT_ADMIN_KO.md)
- [CREATOR WATCH 영상](src/data/creator-videos.json): 한국 유튜버 영상 8건 (미검수 1건 포함)
- [영상 제품 조사 후보](src/data/product-mentions.json): 원본 미확인 후보 7건
- [확인된 판매 링크](src/data/verified-video-products.json): 아직 검증·등록되지 않음

**주의:** 저장소가 Public이라 Issue에 작성한 초안은 공개됩니다. 검토 없이 사실·상품·재고를 확정하지 마세요.


## Sanity Studio CMS (준비됨 · 계정 연결 필요)
- 관리자 준비 화면: https://seoul-edit-web.vercel.app/studio
- 구현된 문서: 기사, CREATOR WATCH 영상, 영상 속 제품 및 러시아 구매 대체품
- Sanity 프로젝트 ID와 dataset을 Vercel `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`에 설정한 뒤 재배포
- Sanity 프로젝트의 API CORS에 `https://seoul-edit-web.vercel.app`을 `Allow credentials`로 추가
- [한국어 설정/관리 안내](docs/SANITY_ADMIN_KO.md)

현재 계정에서는 Sanity 프로젝트 자체를 생성할 수 없으므로, Sanity Manage에서 사용자가 새 프로젝트를 만들거나 기존 프로젝트를 선택해야 합니다. 프로젝트 연결 전에는 기존 정적 콘텐츠가 그대로 표시됩니다. CMS에서는 `editorialStatus=published`로 승인해 Sanity 자체 Publish를 누른 문서만 메인 사이트에서 읽습니다.

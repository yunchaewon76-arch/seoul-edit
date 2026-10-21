# SEOUL EDIT — GitHub · Sanity Studio · Vercel 통합 운영

운영 사이트: https://seoul-edit-web.vercel.app
CMS 화면: https://seoul-edit-web.vercel.app/studio
GitHub 코드: https://github.com/yunchaewon76-arch/seoul-edit
Vercel 프로젝트: https://vercel.com/dio-fc54/seoul-edit-web

## 시스템 역할 — Vercel 공개 화면이 최종 기준

- **Sanity Studio**: 승인된 기사·영상·제품의 편집 원본. 문서를 수정하고 `editorialStatus=published`로 검수한 다음 **Sanity Publish** 버튼을 눌러야 공개 사이트에 반영됩니다.
- **GitHub**: Next.js 코드, 디자인, Studio 설정, 이전 시드 데이터의 버전 저장소. `main` 푸시가 Vercel Production 배포를 시작합니다.
- **Vercel**: 독자가 보는 정식 사이트. 콘텐츠 데이터의 원본 저장소가 아닙니다. 관리자는 같은 도메인에 있는 `/studio`를 통해 편집합니다.

Sanity와 GitHub가 하나의 데이터베이스로 완전 양방향 동기화되는 구조가 아닙니다. Sanity 편집 내용은 GitHub의 정적 JSON을 자동 변경하지 않습니다. 별도 복제 자동화는 콘텐츠 충돌 방지·권한·비밀키 설계 없이 활성화하지 않습니다.

## 현재 기능

1. 기존 GitHub의 `main` 변경 → Vercel 자동 배포 (연결 확인됨).
2. Sanity에서 **실제 Publish된** `editorialStatus=published` 기사·영상·제품 → 사이트에서 우선 표시. 약 10초 재검사 주기를 사용하므로 이미 열린 페이지는 새로고침해야 하며 전 세계 동시 실시간 푸시는 아닙니다.
3. Sanity에 없는 항목은 기존 GitHub 시드로 표시해 마이그레이션 동안 기존 페이지를 보호합니다.
4. 제품은 `sourceId` 또는 같은 이름·색상으로 GitHub 기본 카드와 Sanity 발행 카드를 중복 표시하지 않습니다.
5. 정확한 러시아 판매 링크는 안전한 허용 도메인·검증일 등 기존 규칙을 통과할 때만 클릭됩니다.

## 기존 자료 옮기기 (권한이 있는 관리자가 Studio 로그인 후 직접 실행)

1. `/studio/structure/creator-video-import`: **기존 영상 8개 가져오기**. 이미 있는 영상은 유지하고 없는 항목만 Draft로 만듭니다.
2. `/studio/structure/video-product-import`: **기존 영상 제품 19개 가져오기**. 아직 없는 항목만 **조사 중 초안**으로 등록합니다. 기존 자료·상품 링크를 덮어쓰지 않습니다.
3. `/studio/structure/published-article-import`: 기존 발행 기사 5개가 필요한 경우에만 Sanity로 등록합니다.
4. 편집 후 해당 Sanity 문서의 원본·상품·저작권·러시아어 원고를 확인하고 `editorialStatus=published`를 설정한 후 **Sanity Publish**를 실행합니다.
5. Vercel의 기사 상세 URL을 다시 열거나 새로고침하여 제목·본문·제품 수·러시아 링크를 대조합니다.
6. 동일한 slug의 내용이 Sanity에서 발행되면 Sanity 값이 GitHub 시드보다 우선합니다.

**주의:** 비공개 초안 저장만으로는 사이트에 표시되지 않습니다. Publishing은 별도 승인 절차입니다.

## 장애 대응

- 사이트가 구버전이라면 Vercel의 `seoul-edit-web` 프로젝트(기존 `seoul-edit` 프로젝트 아님)에서 최신 Production commit을 확인합니다.
- 코드 배포에 문제가 있으면 이전 정상 GitHub 커밋으로 되돌리거나 Vercel에서 이전 Production 배포를 다시 promote합니다.
- 기사 본문이 다르면 Sanity의 `editorialStatus`, 문서 Publish 여부, slug가 GitHub 기존 URL과 일치하는지 확인합니다.
- 제품이 중복되면 가져오기 문서의 `sourceId`, 제품명 및 variant를 비교합니다.
- Sanity API에 장애가 발생하면 GitHub 시드 콘텐츠가 일부 페이지에 나타날 수 있으니 관리자가 운영 페이지 상태를 확인합니다.
- Sanity 프로젝트 ID·데이터셋은 Vercel 환경변수에서 관리하며, 쓰기 토큰은 코드나 GitHub 저장소에 보관하지 않습니다.

## 마이그레이션 완료 전까지

기본 데이터가 GitHub에 있고 Sanity 초안은 아직 별도이므로, **한 곳에서 수정했다고 GitHub JSON과 Sanity 초안이 양쪽으로 복제되지는 않습니다.** 충돌 위험을 줄이기 위해 앞으로는 콘텐츠는 Sanity, 기능·디자인은 GitHub에서 편집하고 Vercel을 화면 기준으로 사용합니다.

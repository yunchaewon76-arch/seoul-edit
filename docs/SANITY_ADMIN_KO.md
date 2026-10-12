# SEOUL EDIT Sanity 관리자 연결 안내

## 단계 0: Sanity와 GitHub 연결은 프로젝트 생성이 아닙니다.
현재 ChatGPT에서 연결된 것은 GitHub와 Vercel이며 Sanity 계정을 직접 조작하는 API 권한은 연결되어 있지 않습니다.
따라서 실제 Sanity 프로젝트의 생성 및 접근 권한/관리자 초대는 Sanity 웹사이트에서 계정 소유자가 완료해야 합니다.

## 1. Sanity 프로젝트 생성 또는 기존 프로젝트 선택
https://www.sanity.io/manage → Create project → 이름: SEOUL EDIT → Dataset: production → 계정 권한 확인.
기존 프로젝트가 있다면 중복 생성하지 않고 기존 Project ID를 사용합니다.
Sanity의 GitHub 연결만으로 이 사이트에 자동 연결되는 것은 아닙니다.

## 2. Vercel 환경변수 등록
https://vercel.com/dio-fc54/seoul-edit-web/settings/environment-variables
- NEXT_PUBLIC_SANITY_PROJECT_ID: Sanity Manage → Project Settings → Project ID에 보이는 **식별자** (비밀 토큰 아님)
- NEXT_PUBLIC_SANITY_DATASET: production 또는 실제로 생성한 데이터셋 이름
Production / Preview / Development 환경에 지정. GitHub 코드 안에 실제 토큰을 커밋하지 않습니다.
환경변수 등록 후 반드시 Redeploy 해야 빌드된 클라이언트 번들에 반영됩니다.

## 3. Studio CORS 원본 허용
Sanity Manage → 해당 프로젝트 → Settings → API → CORS Origins.
Origin에 https://seoul-edit-web.vercel.app 추가, **Allow credentials = Yes**(Studio 로그인 필요).
https://*.vercel.app 식의 광범위한 와일드카드 허용 금지.
이후 https://seoul-edit-web.vercel.app/studio 로 이동 → Sanity 계정 로그인.
스튜디오는 Sanity 프로젝트 멤버 권한을 기반으로 인증됩니다.

## 4. 관리 방법
- 📰 일반 기사 (editorialArticle): 카테고리 Beauty/Fashion/Trends, 본문/커버/출처, 검수 상태.
- 🎬 CREATOR WATCH (creatorVideo): 유튜브 ID, 한국어 제목, 러시아어 소개, 검증 상태, 카테고리.
- 🧴 제품/대체품 (videoProduct): 영상 연결, 원제품/대체품, 브랜드, 러시아 판매 링크·확인일·검증 근거.
- 초안 → 검수 중 → 발행 승인으로 상태를 바꾼 다음 **Sanity의 Publish 버튼도 눌러야** 사이트에 반영됩니다.
- 기존 GitHub 기사·영상은 CMS 연결 전에도 사이트에 계속 표시되는 기본 콘텐츠입니다. 새 CMS 자료는 공개 승인된 것만 우선 표시하고, 같은 slug는 CMS 내용으로 대체합니다.
- CMS에서 새 기사를 만들 때 URL slug를 고유하게 설정하세요. 원본 출처 없는 게시물은 발행 승인하지 마세요.
- 정적 변경이 아니므로 이미 게시된 CMS 자료는 60초 정도의 캐시 지연 후 반영될 수 있습니다.

## 주의
- 현재 데이터셋은 공개 읽기(public dataset)를 전제로 서버에서 발행 승인된 데이터만 조회합니다. 비공개 데이터셋은 서버 전용 읽기 토큰과 권한 설계가 추가로 필요합니다.
- GitHub와 Vercel 설정은 개인이 아닌 기존 DIO Vercel Hobby 워크스페이스에 있습니다.
- YouTube 링크/상품 목록·러시아 구매 URL은 검증 후 게시합니다.
- 공개 사이트와 관리자 작업 공간의 로그인 보안은 서로 다릅니다.
- Publish한 CMS 자료만 페이지에 반영하도록 에디토리얼 상태를 확인합니다.
- Studio 내부 화면은 관리자 권한만으로 데이터 수정 가능; 단순 /studio URL 공개 자체는 비밀번호 기능이 아닙니다.

## 기존 영상 8개를 Sanity로 한 번에 이동하기
1. https://seoul-edit-web.vercel.app/studio 에 Sanity 멤버 계정으로 로그인합니다.
2. 왼쪽 메뉴 상단 **📥 기존 영상 8개 가져오기**를 누릅니다.
3. 미등록 영상 확인 뒤 **미등록 영상 초안으로 가져오기** 버튼을 누릅니다.
4. 가져온 8개는 Sanity `creatorVideo`의 **Draft 문서**로 저장됩니다. 같은 slug 문서가 이미 있으면 건너뛰고 기존 내용은 덮어쓰지 않습니다.
5. 왼쪽 **🎬 CREATOR WATCH / Videos**를 열면 편집할 수 있습니다.
6. 각 영상의 원본과 러시아어 내용을 확인한 후 `editorialStatus`를 `published`로 선택하고 Sanity의 **Publish**를 눌러야 실제 사이트가 Sanity 문서를 사용합니다.
7. 영상의 제품 후보는 이번 이관 대상이 아닙니다. 정확한 원제품과 구매처를 확인한 뒤 🧴 제품 메뉴에 별도로 등록하세요.

초안 이관은 관리자가 로그인한 상태에서 직접 누를 때만 실행됩니다. GitHub의 원본 JSON과 기존 라이브 영상은 자동 삭제되지 않습니다. 별도의 Sanity API 토큰을 채팅으로 보내지 않아도 됩니다.

**주의:** 사이트 읽기는 Sanity 공개 읽기 데이터셋을 전제로 합니다. Studio에서는 편집이 되는데 사이트에 반영되지 않으면 dataset 접근 정책과 배포를 점검하세요.


## CREATOR WATCH 기사 본문에 이미지 넣기 — 스키마 오류 수정 (2026-10-12)

Sanity 배열 하나에 `text`와 `image`를 혼합할 수 없어, 기존 텍스트 배열과 이미지 배열을 분리했습니다.
이전 배포에서 나타난 `Schema errors: The array type's 'of' property can't have both object types and primitive types` 문제를 해결하는 구조입니다.

1. https://seoul-edit-web.vercel.app/studio 에 접속, 새로고침(오래된 JS 화면이면 강력 새로고침) 후 **🎬 CREATOR WATCH / Videos** 메뉴에서 글 열기.
2. **확인된 해설 문단 / Текст**: 기존 러시아어 문단은 여기 보관됩니다. 복사/이동/삭제하지 않아도 됩니다.
3. 그 아래 **기사 중간 이미지 / Фото** 항목 → **+** → 이미지 업로드.
4. 이미지 필수 입력: 러시아어 **이미지 설명(alt)**, **사진 설명(caption)**, **출처(credit)**, **사용 권한 확인**.
5. **몇 번째 문단 뒤에 삽입?**에 숫자를 입력: `0` = 본문 시작 전, `1` = 1번째 문단 뒤, `2` = 2번째 문단 뒤. 문단 개수보다 큰 값이면 마지막 문단 뒤에 보입니다.
6. 같은 위치에 여러 사진을 넣는 경우, **기사 중간 이미지** 배열 안에서 사진 카드 순서대로 표시됩니다.
7. 충분히 검수한 뒤 `editorialStatus: published`로 설정하고 Sanity **Publish**를 누르면 약 1분 후 독자 사이트에 반영됩니다.

이미지는 독자 기사에서 러시아어 캡션과 출처가 함께 표시됩니다. 사용 허가되지 않은 유튜브 영상 캡처/브랜드 이미지 업로드는 피해주세요. 기존 문단과 기존 초안은 그대로 유지됩니다.

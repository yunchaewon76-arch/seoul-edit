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

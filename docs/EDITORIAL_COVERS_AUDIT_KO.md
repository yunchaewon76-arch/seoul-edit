# SEOUL EDIT · 기사 표지 전수 검수 / 2026-10-22

## 적용 범위

- 저장소의 기본 기사 14건: 독립 기사 9건, 사전 승인 상세 기사 5건.
- Sanity에 추가 발행된 기사는 공개 사이트·관리자 CMS의 실시간 자료 대조가 필요하며 이 문서의 14건 집계에 포함하지 않음.
- 사이트 및 Sanity 표지 원본을 **이 PR만으로 대체하지 않음**. 이미지의 이용허락이 확인되기 전까지 자동 복제·가공 금지.

## 필요한 원본 이미지 권한 증거

각 기사별 기록: 기사 slug, 원문 링크, 이미지 자체 원본 URL, 권리자/촬영자, 라이선스 또는 사용 허가 증빙, SEOUL EDIT의 웹 재게시 허용, 사진 위 텍스트/크롭 허용, 적용일, 담당자.

표시 규칙: 원본 사진이 허가된 경우에만 Sanity coverImage를 업로드하고 sourceUrl 및 credit을 입력해 rightsConfirmed 체크. 비허가 또는 불명확한 사진은 기존 자체 제작 일러스트/허가된 이미지 유지. 원문 인용 링크만으로 사진 재게시가 합법화되지 않음.

## 확인된 기본 기사 9건(코드 이미지)

- hwahae-2026-what-rankings-tell-us — Unsplash 일반 사진
- olive-young-awards-2025-how-to-read — Unsplash 일반 사진
- pdrn-what-science-actually-knows — Unsplash 일반 사진
- korean-routine-russian-winter — Unsplash 일반 사진
- seoul-fashion-week-2027-city-festival — Unsplash 일반 사진
- k-fashion-five-brands-milan-2026 — Unsplash 일반 사진
- street-style-vs-real-seoul — Unsplash 일반 사진
- global-kbeauty-local-korea — Unsplash 일반 사진
- ten-step-routine-what-is-necessary — Unsplash 일반 사진

## 기존 상세 기사 5건(자체 SVG)

- autumn-baked-blush-korea-2026 — blush-shades.svg
- hwahae-awards-2026-global-pick-products — hwahae-guide.svg
- vintage-watches-not-smartwatches-korean-style — vintage-watch.svg
- korean-wedding-guest-outfit-2026 — wedding-style.svg
- sleep-maxxing-korea-2026 — sleep-maxxing.svg

## 이번 PR의 코드 변경

1. Sanity에 사진의 원본 주소, 권리자, 웹 재게시 및 편집 이용 허락 체크 필드를 추가.
2. 새로운 Sanity 표지는 rightsConfirmed=true일 때만 사이트가 읽도록 제한.
3. 기사 카드에서 이미지 크레디트 표기. 기사 상세에서 원본 이미지 링크와 출처를 표시.
4. 기존 상세 기사에서 Sanity 사진을 바꾸더라도 본문 일러스트는 기존 SVG로 유지.

## 출시 전 확인 목록

- [ ] Sanity에 게시된 **전체** 기사 수·이미지·중복 slug 확인
- [ ] 기사별 관련성 있는 원문 사진 탐색과 이용허락 확인
- [ ] 라이선스가 허용한 크롭/문구 오버레이 범위 준수
- [ ] 크레디트·원본 링크·모바일/데스크톱·러시아어 길이 검수
- [ ] 대표의 명시적 변경 범위·배포 승인
- [ ] 승인 후 Sanity Publish와 Vercel Production 별도 적용/재확인

## 롤백

이 PR을 병합하지 않으면 Production에 영향 없음. 병합 후 문제 발생 시 GitHub revert 또는 Vercel 이전 Production 배포 재승격. CMS에 업로드된 사진은 이전 Sanity 문서 버전을 복원.

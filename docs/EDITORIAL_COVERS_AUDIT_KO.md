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


## 2026-10-22 원문 이미지 권리 조사 (추가)

**상태 분리 원칙:** 이미 쓰는 이미지의 이용 근거와 새로 넣고 싶은 '원문 사진'의 이용 근거는 완전히 별개이다. 출처 URL은 사용 허가 증거가 아니다. 후보 원본 URL을 확보한 후 개별 사진 단위로 기록한다.

### 기존 커버 이용 상태
- 코드에 지정된 Unsplash 사진 9건: Unsplash가 제공하는 일반 라이선스는 상업적 사용, 편집·변형, 출처표기 없는 사용을 허용한다(https://unsplash.com/license). 다만 원본 사진 페이지/개별 촬영자 확인과 인물 초상권·상표권·재산권 여부는 미완료(https://help.unsplash.com/en/articles/2612329-releases-and-trademarks). 콘텐츠 관련성은 낮음.
- 프로젝트 자체 제작 표기된 SVG 5건: GitHub에 저장된 자체 일러스트. 외부 원문을 모방한 사진은 아니며, 원본 제작·권리 양도 기록은 프로젝트 내에서 별도 확인 필요. 기존 그대로 유지.

### 원문 사진 사용 후보 점검 (모든 항목: 실제 사진 교체 미완료)
| 기존 기사 | 원문 사진 후보 / 출처 | 결과 및 후속 조치 |
| --- | --- | --- |
| hwahae-2026-what-rankings-tell-us | https://www.hwahae.com/en/awards/home/2026 | 수상작·브랜드 공식 소재 후보. 해당 사진의 배포/가공 허가 미확인, Hwahae·브랜드 PR에 확인 |
| olive-young-awards-2025-how-to-read | https://www.oliveyoung.co.kr/store/amusement/award.do | 올리브영 이용약관 제29조에 사전 승낙 없는 영리 재사용 제한: https://www.oliveyoung.co.kr/store/company/terms.do ; 사진 재게시 문의 |
| pdrn-what-science-actually-knows | https://pubmed.ncbi.nlm.nih.gov/42572627/ | 학술 인용·표지 사진의 라이선스는 서로 다름. 논문 이미지 무단 복제 금지, 사용 허가된 독립 원본 사진 확보 |
| korean-routine-russian-winter | https://www.aad.org/news/cold-weather-and-your-skin.html | 의학 정보 인용용. 사진 라이선스 별도 미확인, 별도 허가 이미지 확보 |
| seoul-fashion-week-2027-city-festival | https://english.seoul.go.kr/seoul-fashion-week-to-connect-ddp-and-lotte-world-tower-turning-seoul-landmarks-into-runways/ | 서울시 사이트 공개 저작권 정책: https://english.seoul.go.kr/copyright-policy/ ; 미표시 저작물은 일반적으로 Type 4, 보도자료는 기본 Type 1. 해당 URL은 'Economy & Investment News'이므로 개별 사진의 KOGL 유형·권리자 확인 전 사용 금지 |
| k-fashion-five-brands-milan-2026 | https://english.seoul.go.kr/five-seoul-selected-k-fashion-designers-advance-to-sales-at-milan-concept-stores/ | 서울시 'Press Releases' 유형은 기본 Type 1(출처표시 후 수정 가능)이며 서울시가 권리 보유하거나 동의 받은 공공저작물이 전제. 사진별 별도 크레디트/브랜드 3자 권리 확인 |
| street-style-vs-real-seoul | https://www.vogue.com/slideshow/seouls-best-street-style-photos-from-the-spring-2025-shows | 보그 스트리트 스타일 화보 촬영자 Young Chul Kim 명시. 재게시/편집 허가 미확인. Condé Nast 또는 사진가 권리 문의 |
| global-kbeauty-local-korea | https://nielseniq.com/global/en/insights/report/2026/k-beauty-goes-global/ | 리서치/보고서 시각물의 배포 라이선스 미확인. 자체 데이터 시각화 또는 정식 사용 허가 확보 |
| ten-step-routine-what-is-necessary | https://www.aad.org/public/everyday-care/skin-care-basics/dry/pick-moisturizer | 의학 정보 인용용. 원문 사진 자유 이용 근거 확인 불가. 별도 허가된 사진 사용 |
| autumn-baked-blush-korea-2026 | https://www.allurekorea.com/2026/10/13/%EC%9D%B4%EB%B2%88-%EC%8B%9C%EC%A6%8C%EC%97%90%EB%8A%94-%EB%85%B8%EB%A6%87%EB%85%B8%EB%A6%87-%EA%B5%AC%EC%9D%80-%EB%93%AF%ED%95%9C-%EC%B9%98%ED%81%AC-%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85%EC%9D%84/ | 브랜드 제품 사진 및 Instagram 계정 유래 사진이 섞여 있음. 개별 권리자 허가 필요. 자체 SVG 유지 |
| hwahae-awards-2026-global-pick-products | https://blog.hwahae.co.kr/all/newsroom/news/15549 | Hwahae Global 표기 © All Rights Reserved. 공식 홍보 사진의 외부 편집·재게시 권리 불명. PR 허가 필요 |
| vintage-watches-not-smartwatches-korean-style | https://www.allurekorea.com/2026/10/10/요즘-언니들은-스마트워치-대신-빈티지-시계를-찬다/ | 원문 @leechungah_ / @katarinabluu 등 별도 SNS 촬영 소재. Allure에 링크되어도 제삼자 재게시 허가 아님. 기존 SVG 유지 |
| korean-wedding-guest-outfit-2026 | https://www.allurekorea.com/2026/10/14/%ED%95%98%EA%B0%9D%EB%A3%A9-%EB%B8%94%EB%9E%99-%EC%9B%90%ED%94%BC%EC%8A%A4-%EB%A7%90%EA%B3%A0-%EC%9D%B4%EA%B1%B4-%EC%96%B4%EB%95%8C%EC%9A%94/ | @kieunse 등 Instagram 출처 사진. 개별 권리 확인 필요. 기존 SVG 유지 |
| sleep-maxxing-korea-2026 | https://www.koreatimes.co.kr/lifestyle/trends/20261007/forget-waking-up-at-dawn-young-koreans-are-embracing-sleep-maxxing | Hankookilbo 기사를 Korea Times가 재게재한 기사, 원문 사진 'Courtesy of Kang' 등 제삼자 권리 표시. 재게시 허가 없음. 기존 SVG 유지 |

### 실제 편집 접근 확인

- CMS UI URL: https://seoul-edit-web.vercel.app/studio ; 관리자 콘솔: https://www.sanity.io/manage
- GitHub/Vercel 연계·Sanity 조회 코드 확인. ChatGPT 연결 도구 중 Sanity 문서 편집 가능한 제공자 인증 도구는 확인되지 않음.
- Sanity 로그인 세션, Members 역할, CMS 문서 게시 권한은 사용자 직접 로그인 후 확인해야 함. 소유자가 관리자 역할을 확인한 후 사용자 본인이 화면을 조작해야 함. 비밀번호, PAT, API 토큰 공유 금지.
- 공식 역할 설명: https://www.sanity.io/docs/user-guides/roles
- 운영 변경 금지: 본 PR은 검토용 Draft, Production 배포나 Sanity Publish를 실행하지 않음.

### 권리자에게 필요한 허가 항목

이미지별 사진 파일 또는 명확한 URL, 촬영자/권리자, SEOUL EDIT 웹사이트 및 Instagram 활용 여부, 비독점 디지털 게시(러시아어), 자르기·리사이즈·헤드라인/로고 오버레이 수정 권한, 기간·지역·비용·필수 크레디트, 영리/광고 노출 가능성, 삭제 요청 절차. 기록 없이 rightsConfirmed=true로 설정 금지.

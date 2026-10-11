# SEOUL EDIT · CREATOR WATCH 운영 매뉴얼 (2026-10-11)

## 목적
유명 한국 뷰티/패션 크리에이터 영상을 러시아 독자에게 소개하되, **독자적인 해설, 정확한 맥락, 원본 링크, 확인 가능한 제품 구매처**를 담은 정보성 매거진 콘텐츠로 운영한다. 쇼핑 자체를 주목적으로 하지 않는다.

## 현재 구현된 화면
- /video: 영상 2개 큐레이션, YouTube 썸네일 2열/모바일 1열, 시연용 제품 카드 2열
- /video/[slug]: 대형 YouTube 썸네일, 클릭하면 공식 YouTube privacy-enhanced 임베드 로드, 러시아어 해설/출처 메모/제품 카드 영역
- /, /beauty: CREATOR WATCH 영상 카드
- 데스크톱 상단 CREATOR WATCH와 모바일 VIDEO 버튼
- 기존 /signal, /ask, Beauty, Fashion, Trends 기사 유지

## 두 영상 현황
1. https://youtu.be/QGcxSjKaRCs — 외부 공개 게시물에서 2026-05-03 탱코덕 EP.03, 태연과 르세라핌 홍은채의 메이크업 대화로 식별됨.
   - 정밀한 발언/제품/타임스탬프는 검증되지 않았으므로 기사에 기재하지 않는다.
   - 교차 확인 자료: https://theqoo.net/square/4187634843 ; https://gall.dcinside.com/mgallery/board/view/?id=lesserafim&no=135471
2. https://youtu.be/po4uyYWD4nY — 링크 외에 제목, 게시자, 주제, 제품 정보를 독립적으로 확인하지 못함. 검수 대기 상태로 표시.

## 템플릿으로 받은 이미지 2장
- AmyGlamy 헤어캡 기사 레퍼런스와 Swiss Perfection, Sulwhasoo 제품 카드 레이아웃을 참고했다.
- 두 개의 실제 유튜브 링크와 이 이미지들이 동일한 콘텐츠임을 검증하지 못했다. **이미지 속 상품을 영상 속 상품이라고 주장하지 않는다.**
- 예시 상품 2개는 /video에서 사용자 제공 레이아웃을 재현하기 위해 텍스트와 CSS 제품 실루엣만 표시한다. 재고/가격/구매 버튼 없음.
- 공식 영상을 다운로드하거나 프레임을 재업로드하지 않는다. YouTube 썸네일과 내장 플레이어 사용.

## 영상 하나를 발행하는 체크리스트
1. 영상 원본 시청. 저자/채널/업로드 날짜/상업적 협찬 표기 확인.
2. 제목을 러시아어로 번역하되 내용·대사를 꾸며내지 않는다. 타임스탬프, 제품명, 색상, 용량, 실제 사용 장면 검증.
3. 한국어 자막/대사가 제공되는 경우 정확하게 대조하고 원문 전체 복제 대신 기자의 독자적인 러시아어 맥락 설명 작성.
4. 맥락과 한계 명시: 유명인 개인의 루틴을 한국 여성 전체의 습관으로 일반화하지 않음.
5. 허가받지 않은 영상 파일/스크린샷/제품 사진을 서버에 올리지 않는다. 공개 YouTube 임베드 및 썸네일 사용 정책 확인.

## 제품 카드 상태 모델
`src/data/video-products.ts` 내 `confirmedVideoProducts` 배열:
- `videoSlug` 해당 영상에 실제 등장한 제품만 (원본 확인)
- 정확한 브랜드명/제품명/용량 또는 컬러
- `originalOrAlternative:"original"` + `russianProductUrl` (검증된 정확한 러시아 상품 상세 페이지 링크)
- 원제품을 러시아에서 찾지 못하면 대체품 `"alternative"`: 원제품 이름 `alternativeFor`, 비교 이유 `whyComparable`, 독립적인 비교 근거 `comparisonSourceUrl` 필수
- `checkedAt` 최근 14일 이내 / 정확한 상품 페이지의 HTTPS URL
- 브랜드·기능·성분·제형의 차이를 적고 동등한 성능을 단정하지 않는다.
- 매장 상품 페이지를 찾았다는 사실은 그 도시에 제품 재고가 있다는 뜻이 아니다.
- 증거가 없으면 카드에 'Проверяем'만 표시; 구매 링크/대체품 링크 출력 금지.
- 링크가 없는 상태에서 카테고리나 검색 결과 URL을 구매 링크로 위장하지 않는다.
- 제휴 수익 발생 시 광고/제휴 고지.

## 추천 편집 포맷
1) 영상 대표 썸네일 + 원본 공식 링크
2) 러시아어 150–400단어의 독립적 맥락 설명과 실제 확인된 장면
3) 가능하다면 원본 영상 타임스탬프 / 제작자 정보 / 광고·협찬 여부
4) 관련 제품 카드: 실제 출연 장면 확인한 제품만
5) 구매 페이지 또는 근거 있는 Альтернатива (존재할 때만)
6) 원문 링크, 확인 일자, 남은 미확인사항

## 추가 구현(다음 단계)
- Sanity CMS에 videoStories / verifiedProducts / alternatives 데이터 연결. 기사 발행 전 에디터 승인.
- 독자 질문 접수/영상 제보 폼 (스팸 방지·개인정보 안내·서버 연결 후)
- 영상별 타임스탬프·제품 확인 화면과 게시 전 체크리스트
- 실제 영상과 제품 확인 작업은 링크 1개씩 별도 진행


## 카테고리 필터 / 섹션 노출 (2026-10-11)
- `/video`: 전체 2개(기존 자료) / `?category=beauty` / `?category=fashion` / `?category=trends` 네비게이션.
- 각 `/beauty`, `/fashion`, `/trends`에서 `CreatorWatchSection`을 보여준다. 해당 섹션은 **검수 완료된 동일 주제 영상만** 출력한다. 영상이 없으면 "검증 중" empty-state + 전체 링크.
- 독자 제보 2번 영상은 저자/주제 미확인 상태이므로 `category:null`, `reviewStatus:"pending"`으로 유지; 전체 목록에만 보인다.
- 첫 영상은 Beauty 소속. Fashion과 Trends는 현재 검증된 영상 0개.
- 새 영상 추가 시 `src/data/video-stories.ts`에서 `category:"beauty"|"fashion"|"trends"`와 `reviewStatus:"identified"`로 검수 후 등록; 이후 카테고리 페이지에 자동 노출된다.
- 모든 링크는 실제 영상 상세 페이지 `/video/[slug]`로 연결되며 기존 YouTube 원본 재생 기능 유지.

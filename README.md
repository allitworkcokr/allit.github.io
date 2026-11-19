# 올아이티 홈페이지

올아이티 회사 웹사이트입니다.

https://allitworkcokr.github.io/allit.github.io/

## 로컬 개발 환경 설정

### 방법 1: Node.js 사용 (권장)

1. **Node.js 설치 확인**
   ```bash
   node --version
   npm --version
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - 브라우저에서 http://127.0.0.1:3000/ 을 엽니다.
   - 파일 변경 시 자동으로 새로고침됩니다

4. **일반 서버 실행**
   ```bash
   npm start
   ```

### 방법 2: Python 사용

Python이 설치되어 있다면:

```bash
npm run serve
```

### 방법 3: 직접 브라우저에서 열기

`index.html` 파일을 브라우저에서 직접 열어도 됩니다. 단, 일부 기능(JavaScript 모듈 등)이 제한될 수 있습니다.

## 프로젝트 구조

```
allit.github.io/
├── index.html              # 메인 페이지
├── about.html              # 회사 소개
├── careers.html            # 채용 정보
├── components/             # 재사용 가능한 컴포넌트
│   ├── banner.html         # 플로팅 배너
│   ├── footer.html         # 푸터
│   ├── head.html           # HTML 헤드
│   └── nav.html            # 네비게이션
├── css/                    # 스타일시트
│   ├── banner.css          # 배너 스타일
│   ├── common.css          # 공통 스타일
│   ├── footer.css          # 푸터 스타일
│   ├── navigation.css      # 네비게이션 스타일
│   └── sidebar.css         # 사이드바 스타일
├── js/                     # JavaScript 파일
│   ├── navigation.js       # 반응형 메뉴와 키보드 조작
│   └── image-modal.js      # 제품 상세 화면 확대
└── package.json            # 프로젝트 설정
```

## 개발 팁

- **실시간 개발**: `npm run dev` 사용 시 파일 변경이 자동으로 반영됩니다
- 공통 메뉴, 헤드 리소스, 푸터 또는 그라비아 바로가기를 수정한 뒤 `npm run build`를 실행하면 각 HTML과 사이트맵이 갱신됩니다. 생성된 HTML과 사이트맵도 함께 커밋합니다. 개발 서버를 시작할 때도 빌드가 실행됩니다.
- **스타일 수정**: `css/` 폴더의 CSS 파일들을 수정하면 스타일이 업데이트됩니다

## 배포

GitHub Pages에 자동으로 배포됩니다. `main` 브랜치에 푸시하면 자동으로 업데이트됩니다.

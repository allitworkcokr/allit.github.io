# Allit Company Website

Allit 회사 웹사이트입니다.

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
   - 브라우저가 자동으로 열립니다 (http://localhost:3000)
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
│   ├── banner-loader.js    # 배너 로더
│   ├── footer-loader.js    # 푸터 로더
│   ├── head-loader.js      # 헤드 로더
│   ├── nav-loader.js       # 네비게이션 로더
│   ├── navigation.js       # 네비게이션 기능
│   └── sidebar.js          # 사이드바 기능
└── package.json            # 프로젝트 설정
```

## 개발 팁

- **실시간 개발**: `npm run dev` 사용 시 파일 변경이 자동으로 반영됩니다
- **컴포넌트 수정**: `components/` 폴더의 HTML 파일들을 수정하면 모든 페이지에 반영됩니다
- **스타일 수정**: `css/` 폴더의 CSS 파일들을 수정하면 스타일이 업데이트됩니다

## 배포

GitHub Pages에 자동으로 배포됩니다. `main` 브랜치에 푸시하면 자동으로 업데이트됩니다.
